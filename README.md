## vue3-test

jest + Vue Test Utils

> [JSON placeholder](https://jsonplaceholder.typicode.com/):Free fake api for testing and prototyping

### jest
* [mock modules](https://jestjs.io/docs/mock-functions#mocking-modules)
  * [mocked](https://kulshekhar.github.io/ts-jest/docs/guides/test-helpers/#mockedtitem-t-deep--false)
* [manual mock](https://jestjs.io/docs/manual-mocks)
  * [Calling jest.mock with the module factory parameter](https://jestjs.io/docs/es6-class-mocks#calling-jestmock-with-the-module-factory-parameter)
* [.toThrow](https://jestjs.io/docs/expect#tothrowerror)

### Vue Test Utils

api:
* shallowMount: stub child component
* get/find: query element
  * As a rule of thumb, always use `get` except when you asserting something doesn't exist. In that case use `find`
* find/get Component: query component
* [trigger](https://test-utils.vuejs.org/api/#trigger)
* [emitted](https://test-utils.vuejs.org/api/#emitted)
* [exists](https://test-utils.vuejs.org/api/#exists): only be used to `find` because of `get` occur error if element non-exists

### Test Steps
1. render component
2. component display successfully
3. trigger events
4. test view update
   1. dom update is async
   


