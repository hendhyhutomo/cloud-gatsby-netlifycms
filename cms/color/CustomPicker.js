import React from 'react';
import styled from 'styled-components';
import { CustomPicker } from 'react-color';

// STYLED DIV
const CustomPointer = styled.div.attrs((props) => ({
  className: props.className,
}))`
  cursor: pointer;
  margin-top: 1px;
  width: 8px;
  border-radius: 3px;
  height: 13px;
  ${'' /* box-shadow: rgba(0, 0, 0, 0.6) 0px 0px 2px;
  background: rgb(255, 255, 255); */}
  box-shadow: rgb(255, 255, 255) 0px 0px 0px 1.5px,
    rgba(0, 0, 0, 0.3) 0px 0px 1px 1px inset, rgba(0, 0, 0, 0.4) 0px 0px 1px 2px;
  transform: translateX(-50%);
`;
const CustomSaturationPointer = styled.div.attrs((props) => ({
  className: props.className,
}))`
  cursor: pointer;
  width: 10px;
  height: 10px;
  box-shadow: rgb(255, 255, 255) 0px 0px 0px 1.5px,
    rgba(0, 0, 0, 0.3) 0px 0px 1px 1px inset, rgba(0, 0, 0, 0.4) 0px 0px 1px 2px;
  border-radius: 50%;
  transform: translate(-50%, -50%);
`;

const Wrapper = styled.div.attrs((props) => ({
  className: props.className,
}))`
  position: relative;
  width: 100%;
`;

const SliderWrapper = styled.div.attrs((props) => ({
  className: props.className,
}))`
  position: relative;
  cursor: pointer;
  width: 100%;
  height: 15px;
  margin: 10px 0px 0px;
  & > div:last-child > div > div {
    z-index: 100;
  }
  & > div:last-child > div:first-child {
    pointer-events: none;
  }
  & > div:last-child > div:first-child:last-child {
    pointer-events: auto !important;
  }
  & .border {
    position: absolute;
    width: 100%;
    height: 100%;
    box-sizing: content-box;
    top: -2px;
    left: -2px;
    z-index: 10;
    display: block;
    pointer-events: none;
    border-width: 2px;
    border-style: solid;
    border-radius: 5px 5px;
    border-color: rgb(223, 223, 227);
  }
`;
const BoardWrapper = styled.div.attrs((props) => ({
  className: props.className,
}))`
  position: relative;
  cursor: pointer;
  pointer-events: auto;
  width: 100%;
  height: 100px;
  & > div:last-child > div > div:last-child {
    z-index: 100;
  }
  & .border {
    position: absolute;
    width: 100%;
    height: 100%;
    box-sizing: content-box;
    top: -2px;
    left: -2px;
    z-index: 10;
    display: block;
    pointer-events: none;
    border-width: 2px;
    border-style: solid;
    border-radius: 5px 5px;
    border-color: rgb(223, 223, 227);
  }
`;

const InputWrapper = styled.div.attrs((props) => ({
  className: props.className,
}))`
  position: relative;
  pointer-events: auto;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-flow: row nowrap;
  & > div:first-child {
    display: flex;
    justify-content: flex-start;
    flex-flow: row wrap;
  }
`;
// STYLED DIV

// MODULE
const SelectedColor = (props) => {
  const { Checkboard } = require('react-color/lib/components/common');
  const ColorWrapper = styled.div.attrs((props) => ({
    className: props.className,
  }))`
    position: relative;
    pointer-events: auto;
    width: auto;
    margin: 10px 0px 0px 0px;
    display: flex;
    justify-content: flex-start;
    flex-flow: column nowrap;
    align-items: flex-start;
    .label {
      flex-grow: 1;
      max-width: calc(100% - 5px);
      height: 20px;
      background: rgb(223, 223, 227);
      padding: 3px 6px 2px;
      border-radius: 3px 3px 0px 0px;
      font-size: 12px;
      line-height: 1.5;
      text-transform: uppercase;
      font-weight: 600;
      color: rgb(122, 130, 145);
    }
    .color {
      width: 100px;
      height: 46px;
      border-width: 2px;
      border-style: solid;
      border-color: rgb(223, 223, 227);
      border-image: initial;
      border-radius: 0px 5px 5px;
      outline: 0px;
      position: relative;
      background: rgb(223, 223, 227);
      & .border {
        position: absolute;
        width: 100%;
        height: 100%;
        box-sizing: content-box;
        top: -2px;
        left: -2px;
        z-index: 3;
        display: block;
        pointer-events: none;
        border-width: 2px;
        border-style: solid;
        border-radius: 5px 5px;
        border-color: rgb(223, 223, 227);
      }
      & .colorpreview {
        position: relative;
        width: 100%;
        height: 100%;
        z-index: 1;
      }
      & .checkerboard {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0px;
        left: 0px;
        z-index: 0;
      }
    }
  `;
  return (
    <ColorWrapper>
      <div className='label'>PREVIEW</div>
      <div className='color'>
        <div className='border' />
        <div
          className='colorpreview'
          style={{
            background: `rgba(${props.color.r},${props.color.g},${props.color.b},${props.color.a})`,
          }}
        />
        <div className='checkerboard'>
          <Checkboard size={8} white='#fff' grey='#EEE' />
        </div>
      </div>
    </ColorWrapper>
  );
};
// MODULE

class HColorPicker extends React.Component {
  handleChange = (data, e) => {
    var { isValidHex } = require('react-color/lib/helpers/color');
    // HANDLE CHANGE ACCORDING TO THE DATA
    if (data.hex) {
      isValidHex(data.hex) &&
        this.props.onChange(
          {
            hex: data.hex,
            source: 'hex',
          },
          e
        );
    } else if (data.red || data.green || data.blue) {
      this.props.onChange(
        {
          r: data.red || this.props.rgb.r,
          g: data.green || this.props.rgb.g,
          b: data.blue || this.props.rgb.b,
          a: this.props.rgb.a,
          source: 'rgb',
        },
        e
      );
    } else if (data.alpha) {
      if (data.alpha < 0) {
        data.alpha = 0;
      } else if (data.alpha > 1) {
        data.alpha = 1;
      }

      this.props.onChange(
        {
          r: this.props.rgb.r,
          g: this.props.rgb.g,
          b: this.props.rgb.b,
          a: Math.round(data.alpha * 100) / 100,
          source: 'rgb',
        },
        e
      );
    } else if (data.H || data.S || data.L) {
      // Remove any occurances of '%'.
      if (typeof data.S === 'string' && data.S.includes('%')) {
        data.S = data.S.replace('%', '');
      }
      if (typeof data.L === 'string' && data.L.includes('%')) {
        data.L = data.L.replace('%', '');
      }

      this.props.onChange(
        {
          h: data.H || this.props.hsl.h,
          s: Number((data.S && data.S) || this.props.hsl.s),
          l: Number((data.L && data.L) || this.props.hsl.l),
          source: 'hsl',
        },
        e
      );
    }
  };

  render() {
    var {
      Alpha,
      Saturation,
      Hue,
      EditableInput,
    } = require('react-color/lib/components/common');

    // STYLES
    var inputStyles = {
      wrap: {
        position: 'relative',
        paddingTop: '20px',
        width: 'auto',
        minWidth: '150px',
        margin: '10px 10px 0px 0px',
      },
      input: {
        border: '2px solid rgb(223, 223, 227)',
        fontSize: '15px',
        lineHeight: 1.5,
        width: '150px',
        padding: '10px',
        fontFamily: 'inherit',
        borderRadius: '0px 5px 5px',
      },
      label: {
        padding: '3px 6px 2px',
        borderRadius: '3px 3px 0px 0px',
        fontSize: '12px',
        lineHeight: 1.5,
        textTransform: 'uppercase',
        fontWeight: '600',
        background: 'rgb(223, 223, 227)',
        color: 'rgb(122, 130, 145)',
        fontFamily: 'inherit',
        position: 'absolute',
        top: '0px',
        left: '0px',
        height: '20px',
      },
    };
    var inputStylesRGB = {
      wrap: {
        position: 'relative',
        paddingTop: '20px',
        width: 'auto',
        minWidth: '75px',
        margin: '10px 10px 0px 0px',
      },
      input: {
        border: '2px solid rgb(223, 223, 227)',
        fontSize: '15px',
        lineHeight: 1.5,
        padding: '10px',
        width: '75px',
        fontFamily: 'inherit',
        borderRadius: '0px 5px 5px',
      },
      label: {
        padding: '3px 6px 2px',
        borderRadius: '3px 3px 0px 0px',
        fontSize: '12px',
        lineHeight: 1.5,
        textTransform: 'uppercase',
        fontWeight: '600',
        background: 'rgb(223, 223, 227)',
        color: 'rgb(122, 130, 145)',
        fontFamily: 'inherit',
        position: 'absolute',
        top: '0px',
        left: '0px',
        height: '20px',
      },
    };
    // STYLES

    return (
      <Wrapper>
        <BoardWrapper>
          <div className='border' />
          <Saturation
            {...this.props}
            pointer={CustomSaturationPointer}
            onChange={this.props.onChange}
          />
        </BoardWrapper>
        <SliderWrapper>
          <div className='border' />
          <Hue
            direction={'horizontal'}
            {...this.props}
            pointer={CustomPointer}
            onChange={this.props.onChange}
          />
        </SliderWrapper>
        <SliderWrapper>
          <div className='border' />
          <Alpha
            {...this.props}
            pointer={CustomPointer}
            onChange={this.props.onChange}
          />
        </SliderWrapper>
        <InputWrapper>
          <div>
            <EditableInput
              label='hex'
              className='hex'
              style={inputStyles}
              value={this.props.hex}
              onChange={this.handleChange}
            />
            <EditableInput
              label='red'
              className='rgb'
              style={inputStylesRGB}
              value={this.props.rgb.r}
              onChange={this.handleChange}
            />
            <EditableInput
              label='green'
              className='rgb'
              style={inputStylesRGB}
              value={this.props.rgb.g}
              onChange={this.handleChange}
            />
            <EditableInput
              label='blue'
              className='rgb'
              style={inputStylesRGB}
              value={this.props.rgb.b}
              onChange={this.handleChange}
            />
            <EditableInput
              label='alpha'
              style={inputStylesRGB}
              className='rgb'
              arrowOffset={0.01}
              value={this.props.rgb.a}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <SelectedColor color={this.props.rgb} />
          </div>
        </InputWrapper>
      </Wrapper>
    );
  }
}

export default CustomPicker(HColorPicker);
