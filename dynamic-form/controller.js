import { get, chain } from "lodash-es";
import $ from "jquery";

class DynamicFormController {
  constructor($compile, $scope, DynamicFormService, $timeout) {
    this.object = {};
    this.loading = {
      image: false
    };

    this.initData = () => {
      const keys = Object.keys(this.data);
      for (let key of keys) {
        if (this.data[key].value === "") {
          this.object[key] = "";
        } else {
          this.object[key] = this.data[key].value || null;
        }
      }
      this.object.flagAltText = "";
    };

    this.$onInit = () => {
      const keys = Object.keys(this.data);
      this.initData();
      const formHtml = DynamicFormService.generateFormHtml(this.data);
      const formEl = $("#formContainer");
      if (formEl) {
        formEl.html(formHtml);
        $compile(formEl)($scope);

        const $img = $("img");
        $img.on("load", e => $timeout(() => (this.loading.image = false), 500));
        $img.on("error", e =>
          $timeout(() => (this.loading.image = false), 500)
        );
        chain(this.data)
          .filter(f => get(f, "showCharCount", false) && get(f, "maxlength", 0))
          .forEach(f => {
            const $charCount = $(`#${f.name}-char-count > span`);
            const $input = $(`#${f.name}`);
            $input.on("keyup", function(e) {
              $charCount.html(this.value.length);
            });
          })
          .value();
      }
    };
  }

  changeContinent() {
    const continent = get(this.object, "continent", "");
    this.object.country = "";
    if (continent) {
      const countries = this.data.country.options[continent];
      if (countries && countries.length > 0) {
        this.object.country = countries[0];
        this.changeCountry();
      }
    }
  }

  changeCountry() {
    const country = get(this.object, "country.text", "");
    if (country) {
      this.object.image = `https://countryflags.io/${
        this.object.country.code
      }/shiny/64.png`;
      this.object.flagAltText = `Country flag of ${country}`;
      this.loading.image = true;
    } else {
      this.object.image = null;
      this.object.flagAltText = "Country flag";
    }
  }

  submit($event) {
    $event.preventDefault();
    console.log(JSON.stringify(this.object, null, 4));
  }

  reset($event, form) {
    $event.preventDefault();
    form.$setPristine();
    this.initData();
  }
}

export default DynamicFormController;
