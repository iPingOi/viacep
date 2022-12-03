import * as requestService from '../services/request.js'
import Address from '../models/addess.js';

export async function findByCep(cep) {
  const url = `https://viacep.com.br/ws/${cep}/json/`;
  const result = await requestService.getJson(url);

  const address = new Address(result.cep, result.logradouro, null, result.localidade);

  return address;
}