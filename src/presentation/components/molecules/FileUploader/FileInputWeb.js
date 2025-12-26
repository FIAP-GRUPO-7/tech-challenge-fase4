import React from 'react';

export default function FileInputWeb({ multiple = true, accept = 'image/*,application/pdf', disabled = false, onChange }) {
  return (
    <input
      type="file"
      multiple={multiple}
      accept={accept}
      disabled={disabled}
      onChange={(e) => {
        const files = Array.from(e.target.files || []);
        onChange && onChange(files);
      }}
      style={{ marginBottom: 12 }}
    />
  );
}
