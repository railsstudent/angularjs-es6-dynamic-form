import { includes, map } from "lodash-es";

class DynamicFormService {
  constructor() {
    this.inputDirectives = {
      maxlength: "ng-maxlength",
      minlength: "ng-minlength",
      modelOptions: "ng-model-options",
      step: "step",
      disabled: "ng-disabled",
      max: "ng-max",
      min: "ng-min",
      change: "ng-change",
      required: "required",
      placeholder: "placeholder"
    };

    this.dropdownDirectives = {
      change: "ng-change",
      required: "required"
    };
  }

  _generateDirectives(field, directives) {
    return map(directives, (value, name) => {
      if (name === "required" && field[name] === true) {
        return "required";
      }
      if (field[name]) {
        return `${value}="${field[name]}"`;
      }
    }).join(" ");
  }

  _generateInputField(key, field, formName, ctrl) {
    // <div class="form-group" ng-class="{ 'has-error': form.name.$dirty && form.name.$invalid }">
    //   <label for="name">Name:</label>
    //   <input type="text" class="form-control" id="{{$ctrl.data['name'].name}}" name="{{$ctrl.data['name'].name}}" placeholder="{{$ctrl.data['name'].placeholder}}" ng-model="$ctrl.object.name" ng-maxlength="{{$ctrl.data['name'].maxlength}}" ng-model-options="$ctrl.data['name'].modelOptions" required>
    //   <div class="form-group" ng-messages="form.name.$error" ng-if="form.name.$dirty && form.name.$invalid">
    //       <div class="text-danger" ng-message="required">Name field is required.</div>
    //       <div class="text-danger" ng-message="maxlength">Exceed Maximum length.</div>
    //   </div>
    // </div>
    let str = "";
    str += `<div class="form-group" ng-class="{ 'has-error': ${formName}.${
      field.name
    }.$dirty && ${formName}.${field.name}.$invalid }" `;
    if (field.condition) {
      str += ` ng-if="${field.condition}"`;
    }
    if (field.show) {
      str += ` ng-show="${field.show}"`;
    }
    str += ">";
    if (
      typeof field.label !== "undefined" &&
      field.label != null &&
      field.label !== ""
    ) {
      str += `<label for="${field.name}">${field.label}</label>`;
    }
    str += `<input type="${
      field.type
    }" class="form-control" id="${key}" name="${key}" ng-model="${ctrl}.object.${key}" `;
    str += this._generateDirectives(field, this.inputDirectives);
    str += ">";
    if (field.showCharCount === true && field.maxlength) {
      str += `<div class='float-right' id="${field.name}-char-count" name="${
        field.name
      }-char-count">`;
      str += `<span>0</span>/${field.maxlength} characters`;
      str += "</div>";
    }
    str += "</div>";
    return str;
  }

  _generateErrorMessages(field) {
    //<div class="help-block" ng-messages="form.name.$error" ng-if="form.name.$dirty && form.name.$invalid">
    //<div ng-message="required">Name field is required.</div>
    //<div ng-message="maxlength">Exceed Maximum length.</div>
    // </div>
    let err = "";
    if (field.errors && field.errors.length) {
      err += `<div class="help-block" ng-messages="form.${
        field.name
      }.$error" ng-if="form.${field.name}.$dirty && form.${
        field.name
      }.$invalid">`;
      for (let error of field.errors) {
        err += `<div class="text-danger" ng-message="${error.type}">${
          error.message
        }</div>`;
      }
      err += "</div>";
    }
    return err;
  }

  _generateRadioField(key, field, formName, ctrl) {
    //     <div class="form-group" ng-if="$ctrl.object.name && $ctrl.object.name !== ''">
    //     <label for="continents">Continent:</label>
    //     <label class="radio-inline" ng-repeat="option in $ctrl.data['continent'].options track by $index"><input type="radio" name="continents" ng-value="option.value" ng-model="$ctrl.object.continent" ng-change="$ctrl.changeContinent()" />{{ option.text }}</label>
    // </div>
    let str = "";
    str += '<div class="form-group" ';
    if (field.condition) {
      str += ` ng-if="${field.condition}"`;
    }
    str += "'>";

    if (
      typeof field.label !== "undefined" &&
      field.label != null &&
      field.label !== ""
    ) {
      str += `<label for="${field.name}">${field.label}</label>`;
    }
    str += `<label class="radio-inline" ng-repeat="option in ${ctrl}.data.${key}.options track by $index">&nbsp;&nbsp;&nbsp;<input type="radio" name="${
      field.name
    }" ng-value="option.value" ng-model="${ctrl}.object.${key}" `;
    str += this._generateDirectives(field, this.inputDirectives);
    str += " />{{ option.text }}</label></div>";
    return str;
  }

  _generateCountryDropdown(key, field, ctrl) {
    // <div class="form-group" ng-if="$ctrl.object.continent && $ctrl.object.continent !== ''">
    //     <label for="country">Country:</label>
    //     <select class="form-control" ng-model="$ctrl.object.country" id="{{$ctrl.data['continent'].name}}" name="{{$ctrl.data['continent'].name}}" ng-model="$ctrl.object.age">
    //        <option ng-repeat="country in $ctrl.data['country'].options[$ctrl.object.continent] track by $index" ng-value="country">{{country.text}}</option>
    //     </select>
    // </div>
    let str = "";
    str += '<div class="form-group" ';
    if (field.condition) {
      str += ` ng-if="${field.condition}"`;
    }
    str += "'>";

    if (
      typeof field.label !== "undefined" &&
      field.label != null &&
      field.label !== ""
    ) {
      str += `<label for="${field.name}">${field.label}</label>`;
    }
    str += `<select class="form-control" id="${field.name}" name="${
      field.name
    }" ng-model="${ctrl}.object.${key}"`;
    str += this._generateDirectives(field, this.inputDirectives);
    str += `><option ng-repeat="country in ${ctrl}.data.${key}.options[${ctrl}.object.${
      field.parent
    }] track by $index" ng-value="country">{{country.text}}</option>`;
    str += "</select></div>";
    return str;
  }

  _generateCountryFlag(key, field, ctrl) {
    //<div class="form-group" ng-if="$ctrl.object.country.code && $ctrl.object.country.code !== ''">
    //   <label for="flag">Flag:</label>
    //   <img id="{{$ctrl.data['image'].name}}" name="{{$ctrl.data['image'].name}}" ng-src="https://countryflags.io/{{$ctrl.object.country.code}}/flat/64.png" alt="{{$ctrl.object.country.text}}">
    // </div>
    let str = "";
    str += '<div class="form-group" ';
    if (field.show) {
      str += ` ng-show="${field.show}"`;
    }
    str += ">";

    if (
      typeof field.label !== "undefined" &&
      field.label != null &&
      field.label !== ""
    ) {
      str += `<label for="${field.name}">${field.label}</label>`;
    }
    str += `<img id="${field.name}" name="${field.name}" `;
    if (field.src) {
      str += ` ng-src="${field.src}"`;
    }
    str += ` alt="{{${ctrl}.object.flagAltText}}">`;
    str += `<i class="fa fa-spinner fa-spin" ng-if="${ctrl}.loading.image"></i>`;
    str += "</div>";
    return str;
  }

  _generateDropdown(key, field, formName, ctrl) {
    // <div class="form-group">
    //     <label for="gender">Gender:</label>
    //     <select class="form-control" ng-model="$ctrl.object.country" id="{{$ctrl.data['country'].name}}" name="{{$ctrl.data['country'].name}}" ng-model="$ctrl.object.age">
    //        <option ng-repeat="country in $ctrl.data['country'].options[$ctrl.object.continent] track by $index" ng-value="country">{{country.text}}</option>
    //     </select>
    // </div>
    let str = "";
    str += `<div class="form-group" ng-class="{ 'has-error': ${formName}.${
      field.name
    }.$dirty && ${formName}.${field.name}.$invalid }" `;
    if (field.condition) {
      str += ` ng-if="${field.condition}"`;
    }
    str += "'>";

    if (
      typeof field.label !== "undefined" &&
      field.label != null &&
      field.label !== ""
    ) {
      str += `<label for="${field.name}">${field.label}</label>`;
    }
    str += `<select class="form-control" id="${field.name}" name="${
      field.name
    }" ng-model="${ctrl}.object.${key}" ${this._generateDirectives(
      field,
      this.dropdownDirectives
    )}>`;
    str += `<option ng-repeat="option in ${ctrl}.data.${key}.choices track by option.id" ng-value="option.id">{{option.text}}</option>`;
    str += "</select></div>";
    return str;
  }

  generateFormHtml(data, formName = "form", ctrl = "$ctrl") {
    const keys = Object.keys(data);
    let strHtml = `<form id="${formName}" name="${formName}" ng-submit="${ctrl}.submit($event)" novalidate>`;
    for (let key of keys) {
      if (includes(["text", "number"], data[key].type)) {
        strHtml += this._generateInputField(key, data[key], formName, ctrl);
      }
      if (data[key].type === "radio") {
        strHtml += this._generateRadioField(key, data[key], formName, ctrl);
      }
      if (data[key].type === "country") {
        strHtml += this._generateCountryDropdown(key, data[key], ctrl);
      }
      if (data[key].type === "flag") {
        strHtml += this._generateCountryFlag(key, data[key], ctrl);
      }
      if (data[key].type === "list") {
        strHtml += this._generateDropdown(key, data[key], formName, ctrl);
      }
      strHtml += this._generateErrorMessages(data[key]);
    }
    strHtml +=
      '<input class="btn btn-primary" type="submit" value="Submit" ng-disabled="form.$invalid" style="margin-right:10px;"></input>';
    strHtml += `<input class="btn btn-danger" type="button" value="Reset" ng-click="${ctrl}.reset($event, form)"></input>`;
    strHtml += "</form>";
    return strHtml;
  }
}

export default DynamicFormService;
