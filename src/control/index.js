// 完结动画
export const gameOver = () => {
	const { controlStartAction, maskAction } = this.props;
	if (this.diedState) return;
	this.isAnimate = true;
	this.stop && this.stop();
	this.diedState = true;
	this.gameOverAnimate().then(() => {
		this.isAnimate = false;
		maskAction(true);
		controlStartAction();
	});
};
