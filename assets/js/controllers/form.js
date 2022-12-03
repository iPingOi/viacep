import Address from '../models/addess.js';
import * as addressService from '../services/address.js';

function State() {
  this.address = new Address();

  this.btnSave = null;
  this.btnClear = null;

  this.inputCep = null;
  this.inputStreet = null;
  this.inputNumber = null;
  this.inputCity = null;

  this.errorCep = null;
  this.errorNumber = null;
}

const state = new State();

export function init() {
  state.inputCep = document.forms.newAddress.cep;
  state.inputStreet = document.forms.newAddress.street;
  state.inputNumber = document.forms.newAddress.number;
  state.inputCity = document.forms.newAddress.city;

  state.btnSave = document.forms.newAddress.btnSave;
  state.btnClear = document.forms.newAddress.btnClear;

  state.errorCep = document.querySelector('[data-error="cep"]');
  state.errorNumber = document.querySelector('[data-error="number"]');

  state.inputNumber.addEventListener('change', handleInputNumberChange);
  state.inputNumber.addEventListener('keyup', handleInputNumberKeyup);
  state.btnClear.addEventListener('click', handleBtnClearClick);
  state.btnSave.addEventListener('click', handleBtnSaveClick);
  state.inputCep.addEventListener('change', handleInputCepChange);
}

function handleInputNumberKeyup(e) {
  state.address.number = e.target.value;
}

async function handleInputCepChange(e) {
  const cep = e.target.value;

  try {
    const address = await addressService.findByCep(cep);

    state.inputCity.value = address.city;
    state.inputStreet.value = address.street;
    state.address = address;

    setFormError('cep', '');
    state.inputNumber.focus();
  } catch (error) {
    state.inputCity.value = "";
    state.inputStreet.value = "";
    setFormError('cep', 'Informe um CEP válido.');
  }
}

async function handleBtnSaveClick(e) {
  e.preventDefault();
  console.log(state.address);
}

function handleInputNumberChange(e) {
  if (e.target.value == '') {
    setFormError('number', 'Campo requerido');
  } else {
    setFormError('number', '');
  }
}

function handleBtnClearClick(e) {
  e.preventDefault();
  clearForm();
}

function clearForm() {
  state.inputCep.value = "";
  state.inputCity.value = "";
  state.inputNumber.value = "";
  state.inputStreet.value = "";

  setFormError('cep', '');
  setFormError('number', '');

  state.inputCep.focus();
}

function setFormError(key, value) {
  const element = document.querySelector(`[data-error="${key}"]`);
  element.innerHTML = value;
}