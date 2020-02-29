import './style.css';
import UserInfo from './blocks/user-info/UserInfo';
import API from './API';
import FormValidator from './FormValidator';
import PopupAvatar from './blocks/popup/PopupAvatar';
import PopupImage from './blocks/popup/PopupImage';
import PopupNewCard from './blocks/popup/PopupNewCard';
import PopupUserData from './blocks/popup/PopupUserData';
import Card from './blocks/place-card/card';
import CardList from './blocks/place-card/CardList';
const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk/' : 'https://praktikum.tk/';
const authorization = {
    serverUrl: serverUrl,
    group: 'cohort7',
    token: '3c086750-43bf-4c7c-845d-6a8a6edc4f3f'
} 
const userButtonAddCard = document.querySelector('.user-info__button');
const userInfoButton = document.querySelector('.user-info__edit');
const container = document.querySelector('.places-list');
const getPlaceCardImages = () => document.querySelectorAll('.place-card__image');
const userAvatar = document.querySelector('.user-info__photo');
const api = new API(authorization);
const card = new Card(api);
const popupImage = new PopupImage(document.querySelector('.popup__bigimage'));
const cardList = new CardList(container, card, api);
const formValidator = new FormValidator();
const userInfo = new UserInfo(api,formValidator);
const userDataForm = document.forms.userdata;
userInfo.loadUpdateInfo();
cardList.render();

userButtonAddCard.addEventListener('click', function () {
    new PopupNewCard(document.querySelector('.popup__newcard'), card, formValidator, container, api, {once: true}).open();
});

userInfoButton.addEventListener('click', function () {
    new PopupUserData(document.querySelector('.popup__userdata'), userInfo, formValidator).open();
});

userAvatar.addEventListener('click', function () {
    new PopupAvatar(document.querySelector('.popup__avatar'), api, formValidator, userInfo).open()
});

getPlaceCardImages().forEach(function (image) {
    const linkImage = String(image.style.backgroundImage);
    const sourseImage = linkImage.slice(5, -2);
    image.addEventListener('click', function () {
        if (event.target.classList.contains('place-card__delete-icon')) {
            return;
        }
        popupImage.popupBigImageOpen(sourseImage);
    })
});


