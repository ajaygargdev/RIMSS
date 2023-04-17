export const grouping = (list = [], key) => Object.entries(list.reduce((_group, item) => {
    let category = 'default';
    if (item[key] && item[key] !== "") {
        category = item[key]
    }
    if (!_group[category]) {
        _group[category] = [];
    }
    _group[category].push(item);
    return _group;
}, {}));