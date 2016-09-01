import { expect } from "chai"

import { mount } from "enzyme"
import jsdom from "jsdom"
global.document = jsdom.jsdom("<!doctype html><html><body></body></html>")
global.window = global.document.defaultView

import React from "react"


import Sizeable from "../src"

describe("<Sizeable />", () => {
  it("should work with default props", done => {
    const wrapper = mount(
      <div style={{ width: 500 }}>
        <Sizeable>{({ width }) =>
          <div className="contents">{width}</div>
        }</Sizeable>
      </div>
    )
    setTimeout(() => {
      expect(wrapper.find(".contents").text()).to.equal('500')
    }, 50)
  })
})
