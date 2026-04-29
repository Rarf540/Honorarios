exports.handler = async function() {
  try {
    const response = await fetch('https://mindicador.cl/api/uf');
    const data = await response.json();
    const valor = data?.serie?.[0]?.valor;
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ valor })
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Error' }) };
  }
};
