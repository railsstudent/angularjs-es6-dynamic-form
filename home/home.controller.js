class HomeCtrl {
  constructor($scope) {
    "ngInject";

    this.name = "AngularJS Dynamic Form";
    this.data = {
      name: {
        label: "Name:",
        name: "name",
        type: "text",
        placeholder: "Enter your name",
        value: "",
        required: true,
        minlength: 5,
        maxlength: 30,
        showCharCount: true,
        modelOptions: "{ debounce: 300 }",
        errors: [
          {
            type: "required",
            message: "Name field is required."
          },
          {
            type: "maxlength",
            message: "Maximum length of Name field is 30."
          },
          {
            type: "minlength",
            message: "Minimum length of Name field is 5."
          }
        ]
      },
      gender: {
        label: "Gender:",
        name: "gender",
        type: "list",
        value: "",
        required: true,
        choices: [
          { id: "", text: "(Choose one)" },
          { id: "male", text: "Male" },
          { id: "female", text: "Female" },
          { id: "undecided", text: "Undecided" }
        ],
        errors: [
          {
            type: "required",
            message: "Gender field is required."
          }
        ]
      },
      language: {
        label: "Favourite Language:",
        name: "language",
        type: "list",
        value: "",
        required: true,
        choices: [
          { id: "", text: "(Choose one)" },
          { id: "c", text: "C" },
          { id: "cplusplus", text: "C++" },
          { id: "csharp", text: "C#" },
          { id: "go", text: "Golang" },
          { id: "js", text: "JavaScript" },
          { id: "python", text: "Python" },
          { id: "java", text: "Java" },
          { id: "rlang", text: "R" },
          { id: "rust", text: "Rust" },
          { id: "typescript", text: "Typescript" }
        ],
        errors: [
          {
            type: "required",
            message: "Language field is required."
          }
        ]
      },
      age: {
        label: "Age:",
        name: "age",
        type: "number",
        min: 1,
        max: 100,
        step: 1,
        value: 2,
        disabled: "!$ctrl.object.name || $ctrl.object.name === ''",
        errors: [
          {
            type: "min",
            message: "Minimum value is 1."
          },
          {
            type: "max",
            message: "Maximum value is 100."
          },
          {
            type: "number",
            message: "Age expects an integer."
          },
          {
            type: "step",
            message: "Age can increment by 1 only."
          }
        ]
      },
      address1: {
        label: "Address Line 1:",
        name: "address1",
        type: "text",
        value: "",
        placeholder: "Address line 1",
        required: true,
        showCharCount: true,
        maxlength: 50,
        modelOptions: "{ debounce: 300 }",
        errors: [
          {
            type: "required",
            message: "Address1 field is required."
          },
          {
            type: "maxlength",
            message: "Maximum length of Address1 field is 50."
          }
        ]
      },
      address2: {
        label: "Address Line 2:",
        name: "address2",
        type: "text",
        value: "",
        placeholder: "Address line 2",
        showCharCount: true,
        maxlength: 50,
        modelOptions: "{ debounce: 300 }",
        show: "$ctrl.object.address1 && $ctrl.object.address1 !== ''",
        errors: [
          {
            type: "maxlength",
            message: "Maximum length of Address2 field is 50."
          }
        ]
      },
      continent: {
        label: "Continent:",
        name: "continent",
        type: "radio",
        value: "africa",
        condition: "$ctrl.object.name && $ctrl.object.name !== ''",
        required: true,
        change: "$ctrl.changeContinent()",
        value: "",
        options: [
          { value: "africa", text: "Africa" },
          { value: "asia", text: "Asia" },
          { value: "europe", text: "Europe" },
          { value: "oceania", text: "Oceania" },
          { value: "north_america", text: "North & Central America" },
          { value: "south_america", text: "South America" }
        ]
      },
      country: {
        label: "Country:",
        name: "country",
        type: "country",
        condition:
          "$ctrl.object.name && $ctrl.object.name !== '' && $ctrl.object.continent && $ctrl.object.continent !== ''",
        change: "$ctrl.changeCountry()",
        value: {
          code: "",
          text: ""
        },
        parent: "continent",
        options: {
          africa: [
            { code: "KE", text: "Kenya" },
            { code: "EG", text: "Egypt" },
            { code: "ZM", text: "Zambia" },
            { code: "NG", text: "Nigeria" },
            { code: "CM", text: "Cameroon" }
          ],
          asia: [
            { code: "HK", text: "Hong Kong" },
            { code: "CN", text: "China" },
            { code: "TW", text: "Taiwan" },
            { code: "JP", text: "Japan" },
            { code: "KR", text: "S. Korea" },
            { code: "RU", text: "Russia" },
            { code: "SG", text: "Singapore" },
            { code: "TH", text: "Thailand" },
            { code: "MY", text: "Malaysia" }
          ],
          europe: [
            { code: "FR", text: "France" },
            { code: "GB", text: "United Kingdom" },
            { code: "BE", text: "Belgium" },
            { code: "DE", text: "Germany" },
            { code: "NL", text: "Netherlands" },
            { code: "ES", text: "Spain" },
            { code: "PT", text: "Portugal" },
            { code: "CH", text: "Switzerland" },
            { code: "SE", text: "Sweden" }
          ],
          oceania: [
            { code: "AU", text: "Australia" },
            { code: "NZ", text: "New Zealand" }
          ],
          north_america: [
            { code: "CA", text: "Canada" },
            { code: "US", text: "USA" },
            { code: "MX", text: "Mexico" },
            { code: "CR", text: "Costa Rica" },
            { code: "PA", text: "Panama" }
          ],
          south_america: [
            { code: "BR", text: "Brazil" },
            { code: "AR", text: "Argentina" },
            { code: "CL", text: "Chile" },
            { code: "CO", text: "Colombia" },
            { code: "PE", text: "Peru" }
          ]
        }
      },
      image: {
        label: "Country Flag:",
        name: "flag",
        type: "flag",
        show:
          "$ctrl.object.name && $ctrl.object.name !== '' && $ctrl.object.continent && $ctrl.object.continent !== '' && $ctrl.object.country && $ctrl.object.country.code !== ''",
        src:
          "https://countryflags.io/{{$ctrl.object.country.code}}/shiny/64.png",
        alt: ""
      }
    };
  }
}

export default HomeCtrl;
