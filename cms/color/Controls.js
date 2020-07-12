import PropTypes from 'prop-types';
import styled from 'styled-components';
import React from 'react';
import CustomPicker from './CustomPicker';
// import { ChromePicker } from 'react-color';

const Wrapper = styled.div.attrs((props) => ({
  className: props.className,
}))`
  display: flex;
  width: 100%;
  padding: 10px 10px;
  border-width: 2px;
  border-style: solid;
  border-color: rgb(223, 223, 227);
  border-image: initial;
  border-radius: 0px 5px 5px;
  outline: 0px;
`;

export default class Control extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.node,
    classNameWrapper: PropTypes.string.isRequired,
  };

  static defaultProps = {
    value: '',
  };

  render() {
    const { onChange, classNameWrapper } = this.props;

    // CHECK IF Format is MAP and Reparse
    if (
      Object.getPrototypeOf(this.props.value)
        .toString()
        .toUpperCase()
        .includes('MAP')
    )
      this.props.value = JSON.parse(JSON.stringify(this.props.value));

    return (
      <div>
        <Wrapper className={classNameWrapper}>
          <CustomPicker
            color={this.props.value}
            onChange={(e) => {
              return onChange(e.rgb);
            }}
          />
        </Wrapper>
      </div>
    );
  }
}
