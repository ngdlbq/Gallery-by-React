var React = require('react');


// 获取图片相关的数据(利用自执行函数)
var imageDatas = require('../data/imageDatas');

imageDatas = (function genImageURL(imageDataArr){
	for (var i = 0; i < imageDataArr.length; i++) {
		var singleImgData = imageDataArr[i];


		// 获取图片的 url 地址
		singleImgData.imageURL = require('../public/images/' + singleImgData.fileName);

		imageDataArr[i] = singleImgData
	};

	return imageDataArr;
})(imageDatas);


// 单个图片组件
var ImgFigure = React.createClass({
	// 点击处理函数
	handleClick: function(e){

		this.props.inverse();


		e.stopPropagation();
		e.preventDefault();
	},

	render: function(){

		var styleObj = {};

		isInverse = this.props.arrange.isInverse;

		var imgFigureClassName = 'img-figure';
		imgFigureClassName += isInverse ? ' is-inverse': '';

		return (
				<figure className={imgFigureClassName} onClick={this.handleClick}>
					<img src={this.props.data.imageURL} alt={this.props.data.title} />
					<figcaption>
						<h2 className="img-title">{this.props.data.title}</h2>
						<div className="imgFigure-back">
							<p>
								{this.props.data.desc}
							</p>
						</div>
					</figcaption>
				</figure>
			)
	}
})

// 整个 app 应用,他是大管家
var GalleryApp = React.createClass({
	getInitialState: function(){
		return {
			imgArrangeArr: []
		}
	},


	// 组件加载以后,进行操作
	componentDidMount: function() {
		
	},


	// 翻转
	inverse: function(index){
		return function(){

			var imgArrangeArr = this.state.imgArrangeArr;

			imgArrangeArr[index].isInverse =  !imgArrangeArr[index].isInverse;

			this.setState({
				imgArrangeArr: imgArrangeArr
			})

		}.bind(this)
	},

	render: function(){
		var controllerUnits = [];
		var ImgFigures = [];

		imageDatas.forEach(function(item,index){

			if(!this.state.imgArrangeArr[index]){
				this.state.imgArrangeArr[index] = {
					isInverse: false
				}
			}

			ImgFigures.push(<ImgFigure data={item} inverse={this.inverse(index)} key={index} arrange={this.state.imgArrangeArr[index]} />);
		}.bind(this))

		return (
				<section className="stage" ref='stage'> 
					<section className="img-sec">
						{ImgFigures}
					</section>
					<nav className="controller-nav">
						{controllerUnits}
					</nav>
				</section>
			)
	}
})


module.exports = GalleryApp