import request from 'sync-request-curl';
import { port, url } from './config.json';
import { clear, peopleAdd, peopleList, personView, personEdit, personRemove, peopleStats } from './people';

const SERVER_URL = `${url}:${port}`;

/**
 * Use the imported `request` library to send a request to the server and retrieve a response
 * Documentation:
 * - GitHub: https://github.com/nktnet1/sync-request-curl
 * - NPM: https://www.npmjs.com/package/sync-request-curl
 */

beforeEach(() => {
  // clear();
  request('DELETE', SERVER_URL + '/clear', {});
});

describe('clear', () => {
  test('Test successful clear return when empty', () => {
    const response = request('DELETE', SERVER_URL + '/clear', {});
    const retVal = JSON.parse(response.body.toString());
    expect(retVal).toStrictEqual({});
    // expect(clear()).toStrictEqual({});
    // You should still be testing side effects
    // You'll also notice that if you try to be cheeky
    // and use getData(), it won't work (you'll be very confused)
  });
});

// Remove repetitive code with "wrapper functions"

function requestPeopleAdd(name: string, age: number) {
  const response = request('POST', SERVER_URL + '/people/add', {
    // json property since we want to store in json body
    json: {
      name: name,
      age: age
    }
  });
  // The response returns is an object as well but we
  // store the information we want in the "body"
  // That body is in a JSON format so we extract it and convert
  // it to a javascript format with JSON.parse()
  return JSON.parse(response.body.toString());
}

describe('peopleAdd', () => {
  test('Test adding successful person return type', () => {
    expect(requestPeopleAdd('hello', 5)).toStrictEqual({ personId: expect.any(Number) });
    // expect(peopleAdd('hello', 5)).toStrictEqual({ personId: expect.any(Number) });
  });
});

function requestPeopleList(minAge: number) {
  const response = request('GET', SERVER_URL + '/people/list', {
    // qs since we want to store in query string
    qs: {
      minAge: minAge
    }
  });
  return JSON.parse(response.body.toString());
}

describe('peopleList', () => {
  test('Test getting successful person details', () => {
    const person = requestPeopleAdd('hello', 5);
    expect(requestPeopleList(5)).toStrictEqual({
      people: [
        {
          personId: person.personId,
          name: 'hello',
          age: 5,
        }
      ],
    });

    // const person = peopleAdd('hello', 5);
    // expect(peopleList(5)).toStrictEqual({
    //   people: [
    //     {
    //       personId: person.personId,
    //       name: 'hello',
    //       age: 5,
    //     }
    //   ],
    // });
  });
});

function requestPersonView(personId: number) {
  const response = request('GET', SERVER_URL + `/person/${personId}`, {});
  return JSON.parse(response.body.toString());
}

describe('personView', () => {
  test('Test successful person view', () => {
    const person = requestPeopleAdd('Tam', 22);
    expect(requestPersonView(person.personId)).toStrictEqual({
      person: {
        personId: person.personId,
        name: 'Tam',
        age: 22,
      }
    });
    // const person = peopleAdd('Tam', 22);
    // expect(personView(person.personId)).toStrictEqual({
    //   person: {
    //     personId: person.personId,
    //     name: 'Tam',
    //     age: 22,
    //   }
    // });
  });
});

// You should be testing in more depth than I am but I am not since
// this should just a guideline of what you should be doing
