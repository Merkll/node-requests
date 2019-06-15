export default class {
  static modifyRequest(req) {
    const { pathParameters, path, httpMethod = 'get' } = req;
    let { body, queryStringParameters } = req;
    try {
      body = JSON.parse(body);
      queryStringParameters = JSON.parse(queryStringParameters);
    // eslint-disable-next-line no-empty
    } catch (error) {}

    return {
      ...req,
      body: body || {},
      query: queryStringParameters || {},
      method: httpMethod.toLowerCase(),
      path,
      params: pathParameters || {},
    };
  }
}
