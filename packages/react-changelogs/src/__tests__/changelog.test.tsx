import * as React from "react";
import { mount } from "enzyme";

import Changelog from "../components/changelog";

const initialProps = `# This package itself

## 1.0.0
- [major] 24601
## 0.5.0
- [minor] Who am I?`;

describe("<Changelog />", () => {

    it("renders changelog component", () => {
        const wrapper = mount(
            <Changelog changelog={initialProps} getUrl={() => null}/>
        );
        expect(wrapper.find("LogItem")).toBeDefined();
        expect(wrapper.find("a")).toHaveLength(0);
    });

    it("renders link for changelog when version url is provided", () => {
        const url = `https://bitbucket.org/atlassian/atlaskit-mk-2/commits/tag/%40atlaskit%2Fbutton%4010.1.3`;
        const myMock = jest.fn();
        myMock.mockReturnValueOnce(url);
        myMock.mockReturnValueOnce(url);
        const wrapper = mount(
            <Changelog changelog={initialProps} getUrl={myMock}/>
        );
        expect(wrapper.find("a")).toHaveLength(2);
    });

    it("renders changelog based on the specified range", () => {
        const wrapper = mount(
            <Changelog changelog={initialProps} getUrl={() => null} range=">0.5.0"/>
        );
        expect(wrapper.find("h3")).toHaveLength(1);
    });
});