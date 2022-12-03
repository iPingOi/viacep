import RequestException from './exceptions/request-exception.js'

export async function getJson(url) {
  try {
    const res = await fetch(url);
    const body = await res.json();
    
    return body;
  } catch (e) {
    throw new RequestException("Erro ao realizar requisição.");
  }
}