export function keyTab (e) {
    if (e.keyCode === 9) {
        e.preventDefault()
        e.target.setRangeText(
            '\t',
            e.target.selectionStart,
            e.target.selectionStart,
            'end'
        )
    }
}
