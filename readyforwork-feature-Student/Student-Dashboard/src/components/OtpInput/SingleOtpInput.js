import React, { memo, useEffect, useRef, useLayoutEffect } from 'react';

// usePrevious Hook
function usePrevious(value) {
  const ref = useRef();
  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

export function SingleOTPInputComponent(props) {
  const { focus, autoFocus, ...rest } = props;
  const inputRef = useRef(null);
  const prevFocus = usePrevious(!!focus);
  useLayoutEffect(() => {
    if (inputRef.current) {
      if (focus && autoFocus) {
        inputRef.current.focus();
      }
      if (focus && autoFocus && focus !== prevFocus) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    }
  }, [autoFocus, focus, prevFocus]);
  return <div className="col-2">
    <div className="mb-3">
      <input ref={inputRef} {...rest} />
    </div>
  </div>;
}

const SingleOTPInput = memo(SingleOTPInputComponent);
export default SingleOTPInput;