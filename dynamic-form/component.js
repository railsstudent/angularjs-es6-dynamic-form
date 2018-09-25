import './main.css';
import template from './main.html';
import DynamicFormController from './controller';

const component = {
  template,
  controller: DynamicFormController,
  bindings: {
    data: '<',
    name: '<'
  }
};

export default component