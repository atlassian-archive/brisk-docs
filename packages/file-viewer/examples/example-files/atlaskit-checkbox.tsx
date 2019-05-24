import React, { PureComponent } from 'react';
import { Checkbox } from '@atlaskit/checkbox';

type State = {
  onChangeResult: string,
};

const BasicUsageExample = class extends PureComponent<void, State> {
  state = {
    onChangeResult: 'Check & Uncheck to trigger onChange',
  };

  onChange = (event: any) => {
    this.setState({
      onChangeResult: `onChange called with value: ${
        event.target.value
        } isChecked: ${event.target.checked}`,
    });
  };

  render() {
    return (
      <div>
        <Checkbox
          value="Basic checkbox"
          label="Basic checkbox"
          onChange={this.onChange}
          name="checkbox-basic"
        />
        <Checkbox
          defaultChecked
          label="Checked by default"
          value="Checked by default"
          onChange={this.onChange}
          name="checkbox-checked"
        />
        <Checkbox
          isDisabled
          label="Disabled"
          value="Disabled"
          onChange={this.onChange}
          name="checkbox-disabled"
        />
        <Checkbox
          isInvalid
          label="Invalid"
          value="Invalid"
          onChange={this.onChange}
          name="checkbox-invalid"
        />
        <Checkbox
          isFullWidth
          label="Full Width"
          value="Full Width"
          onChange={this.onChange}
          name="checkbox-fullwidth"
        />

        <div
          style={{
            borderStyle: 'dashed',
            borderWidth: '1px',
            borderColor: '#ccc',
            padding: '0.5em',
            color: '#ccc',
            margin: '0.5em',
          }}
        >
          {this.state.onChangeResult}
        </div>
      </div>
    );
  }
};

export default BasicUsageExample;