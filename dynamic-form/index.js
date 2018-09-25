import component from './component';
import DynamicFormService from './service';
import angular from 'angular';

const dynamicModule = angular.module('dynamic', []);

dynamicModule
    .component('dynamicForm', component)
    .service('DynamicFormService', DynamicFormService);

export default dynamicModule;