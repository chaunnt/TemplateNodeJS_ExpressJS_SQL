const Cryptr = require('cryptr');
const _ = require('lodash');
const { jwtSecret } = require('../constants/appConstant');
const cryptr = new Cryptr('13131');
const jwt = require('jsonwebtoken');
const NodeGeocoder = require('node-geocoder');
const { add } = require('lodash');

var possible = [
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  'abcdefghijklmnopqrstuvwxyz',
  '0123456789',
  '!@#$%^&*'
];

const options = {
  provider: 'google',
  apiKey: 'AIzaSyA4NK5IxzMRr4_uBVa6J4DUoNxdfqDEVbw'
};
const geocoder = NodeGeocoder(options);

function hashPassword(password) {
  const hashedPassword = cryptr.encrypt(password);
  return hashedPassword;
}

function unhashPassword(hash) {
  const pass = cryptr.decrypt(hash);
  return pass;
}

function comparePassword(password, hashPass) {
  let dePass = cryptr.decrypt(hashPass);
  console.log(dePass);
  if (dePass === password) return true;
  return false;
}

const randomPassword = length => {
  const strArray = new Array(length);
  var possibleAll = possible.join('');
  for (let i = 0; i < strArray.length; i++) {
    if (!strArray[i])
      strArray[i] = possibleAll.charAt(
        Math.floor(Math.random() * possibleAll.length)
      );
  }
  return strArray.join('');
};

const getCurrentUser = req => {
  const authorization =
    _.get(req, ['headers', 'authorization']) ||
    _.get(req, ['headers', 'Authorization']);
  let token = null;
  let currentUser;
  if (!!authorization) {
    token =
      authorization.split(' ')[0] === 'Bearer'
        ? authorization.split(' ')[1]
        : authorization;
  } else if (req.query && req.query.token) {
    token = req.query.token;
  }
  if (!token) return null;
  try {
    currentUser = token ? jwt.verify(token, jwtSecret) : null;
  } catch (e) {
    return null;
  }
  return currentUser;
};

const getCorrectAddress = base_address => {
  if (!base_address) {
    return {
      address: null,
      ward: null
    };
  }
  let array = base_address.split(' ');
  let exist_id = -1;
  let ward = null;
  for (let i = 0; i < array.length; i++) {
    let temp = array[i];
    if (temp.startsWith('P.') || temp.startsWith('p.')) {
      if (!isNaN(temp.substring(2))) {
        ward = Number(temp.substring(2));
        exist_id = i;
      }
    } else if (temp.startsWith('P') || temp.startsWith('p')) {
      if (!isNaN(temp.substring(1))) {
        ward = Number(temp.substring(1));
        exist_id = i;
      }
    }
  }
  if (exist_id === -1) {
    return {
      address: base_address,
      ward: ward
    };
  } else {
    let after_addr = '';
    for (let i = 0; i < array.length; i++) {
      if (i === exist_id) continue;
      after_addr = after_addr + array[i] + ' ';
    }
    if (after_addr.endsWith(' ')) {
      after_addr = after_addr.substring(0, after_addr.length - 1);
    }
    return {
      address: after_addr,
      ward: ward
    };
  }
};

const handlerResponse = funct => {
  return async (req, res, next) => {
    try {
      return await funct(req, res);
    } catch (error) {
      console.log('error:', error);
      return next(error);
    }
  };
};

const getLatLong = async (address, ward, district) => {
  let searchText = '';
  if (!district) return null;
  switch (Number(district)) {
    case 70101:
      district = 'Quận 1';
      break;
    case 70103:
      district = 'Quận 2';
      break;
    case 70105:
      district = 'Quận 3';
      break;
    case 70107:
      district = 'Quận 4';
      break;
    case 70109:
      district = 'Quận 5';
      break;
    case 70111:
      district = 'Quận 6';
      break;
    case 70113:
      district = 'Quận 7';
      break;
    case 70115:
      district = 'Quận 8';
      break;
    case 70117:
      district = 'Quận 9';
      break;
    case 70119:
      district = 'Quận 10';
      break;
    case 70121:
      district = 'Quận 11';
      break;
    case 70123:
      district = 'Quận 12';
      break;
    case 70125:
      district = 'Quận Gò Vấp';
      break;
    case 70127:
      district = 'Quận Tân Bình';
      break;
    case 70128:
      district = 'Quận Tân Phú';
      break;
    case 70129:
      district = 'Quận Bình Thạnh';
      break;
    case 70131:
      district = 'Quận Phú Nhuận';
      break;
    case 70133:
      district = 'Quận Thủ Ðức';
      break;
    case 70134:
      district = 'Quận Bình Tân';
      break;
    case 70135:
      district = 'Huyện Củ Chi';
      break;
    case 70137:
      district = 'Huyện Hốc Môn';
      break;
    case 70139:
      district = 'Huyện Bình Chánh';
      break;
    case 70141:
      district = 'Huyện Nhà Bè';
      break;
    case 70143:
      district = 'Huyện Cần Giờ';
      break;
  }
  if (address === null && ward === null && district === null) return null;
  if (address !== null) {
    searchText += address;
    if (ward !== null) {
      searchText += ', ' + ward;
    }
    if (district !== null) {
      searchText += ', ' + district;
    }
  } else {
    if (ward !== null) {
      searchText += ward;
      if (district !== null) {
        searchText += ', ' + district;
      }
    } else {
      searchText += district;
    }
  }
  if (searchText === '') return null;
  searchText += ', thành phố Hồ Chí Minh';
  searchText.replace(',,', ',');
  var res = await geocoder.geocode({
    language: 'Vi',
    address: searchText,
    country: 'Việt Nam'
  });
  if (res === null || res.length === 0) {
    if (ward) {
      searchText = ward + ', ' + district + ', thành phố Hồ Chí Minh';
    } else {
      searchText = district + ', thành phố Hồ Chí Minh';
    }
    res = await geocoder.geocode({
      language: 'Vi',
      address: searchText,
      country: 'Việt Nam'
    });
  }

  return res;
};

const getEngString = stringText => {
  if (!stringText) return '';
  let ret = stringText.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  ret = ret.replace('đ', 'd');
  ret = ret.replace('Đ', 'D');
  return ret;
};

module.exports = {
  hashPassword,
  comparePassword,
  handlerResponse,
  randomPassword,
  getCorrectAddress,
  unhashPassword,
  getCurrentUser,
  getLatLong,
  getEngString
};
