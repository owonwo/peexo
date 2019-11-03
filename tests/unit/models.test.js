/* eslint-disable */
import {
  expect,
} from 'chai'
import userFactory from '../../src/lib/models/users'
import response from './profile_response'
import postFactory from '../../src/lib/models/post';


describe('Model Checks', () => {
  const user = userFactory(response)
  const b = userFactory({
    id: 3,
  })

  it('has matching prototype', () => {
    expect(user.__proto__).to.be.equal(b.__proto__)
    expect(user.first_name).to.be.equal('Gabriel')
    expect(user).to.not.haveOwnProperty('user')
  })

  it('Post prop match', () => {
    [postFactory].forEach((fn) => {
      const a = fn({
        name: 'Averger',
      })
      const b = fn({
        name: 'Akim',
      })
      expect(b.__proto__).to.be.equal(a.__proto__);

      ['getOwner', 'getCategory'].map((prop) => {
        expect(a[prop].__proto__.constructor).to.be.equal(Function)
      })
    })
  })

  it('can greet user', () => {
    expect(user.welcomeMessage()).to
      .contains('Hi, ')
  })

  it('gets the users fullname', () => {
    expect(user.fullname()).to.equal(`${user.first_name} ${user.last_name}`)
  })

  it('it has working generic methods', () => {
    [userFactory].forEach((fn) => {
      const id = 2
      const model = fn({
        id,
      })
      expect(model).to.have.property('getId')
      expect(model.getId()).to.equal(id)
    })
  })
})
