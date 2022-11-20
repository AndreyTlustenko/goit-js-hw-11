export default class LoadMoreBtn{
    constructor({ selector, hidden = false}) {
        this.refs = this.getRefs(selector);
        hidden && this.hide();
    }

getRefs(selector) {
    const refs = {}
    refs.button = document.querySelector(selector)
    refs.label = refs.button.querySelector('.spiner')
    return refs;
}
enable() {
    this.refs.button.disabled = false;


}
disabled() {
    this.refs.button.disabled = true;

}
    show() {
        this.refs.button.classList.remove('is-hidden');
}
    hide() {
        this.refs.button.classList.add('is.hidden');
}
};
