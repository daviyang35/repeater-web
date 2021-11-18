// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import '../jest.mocks'
import React from 'react'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route)
  // @ts-ignore
  return render(ui, { wrapper: BrowserRouter })
}

function spyOnRender (componentClass, returnValue = null) {
  return jest.spyOn(componentClass.prototype, 'render').mockReturnValue(returnValue)
}

global.renderWithRouter = renderWithRouter
global.spyOnRender = spyOnRender
