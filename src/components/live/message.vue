<template>
	<div class="message">
		<ul class="list">
			<li v-for="n in 2">
				<em>11:11:11</em>
				<p><span>系统消息：</span>你没钱了忘记为今晚我饥饿哦我去见覅偶。</p>
				<div class="item">
					<img src="">
					<div class="desc">
						<div class="title">名字我怕我卡欧派我靠谱的恐怕</div>
						<div class="info">
							<div class="price">￥<span>233</span></div>
							<div class="stock">库存：<span>3333</span></div>
						</div>
					</div>
				</div>
				<div class="btn">
					<el-button type="primary">充值</el-button>
				</div>
			</li>
		</ul>
	</div>
</template>
<style scoped lang="less">
	.message {
		flex: 3;
		display: flex;
		flex-direction: column;
		padding-bottom: 40px;
		.list {
			height: 0; // ?
			overflow: auto;
			flex: 1;
			background: #F7F8FA;
			font-size: 12px;
			li {
				margin: 10px;
				padding: 10px;
				background: #eaebed;
				display: flex;
				flex-direction: column;
				em {
					font-style: normal;
					font-family: HelveticaNeue;
				}
				p {
					color: #333;
					span {
						color: #666;
					}
				}
				.item {
					display: flex;
					// display: none;
					.info {
						display: flex;
						.price {
							margin-right: 20px;
						}
						.stock {
							color: #999;
						}
					}
				}
				.btn {
					align-self: flex-end;
				}
			}
		}
	}
</style>
