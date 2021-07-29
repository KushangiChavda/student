const allChecked = (data) => data && data.length > 0 && data.every(d => d.select === true) ? true : false;

export default allChecked;