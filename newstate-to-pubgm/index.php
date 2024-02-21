<!DOCTYPE html>
<html>

<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta name="theme-color" content="#00d1b2">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@simenatsu" />
	<meta name="twitter:creator" content="@simenatsu" />
	<meta property="og:url" content="https://simenatsu.github.io/pubgm-to-newstate" />
	<meta property="og:title" content="NEWSTATE感度変換機" />
	<meta property="og:description" content="NEWSTATEの感度をPUBGMの感度に変換。" />
	<meta property="og:image" content="https://simenatsu.github.io/pubgm-to-newstate/images/summary.png" />

	<link rel="shortcut icon" href="favicon.ico">
	<link rel="apple-touch-icon" href="images/icon.png" sizes="120x120">
	<link rel="icon" type="image/png" href="images/icon.png" sizes="120x120">

	<title>NEWSTATEからPUBG Mobile</title>

	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
	<script src="https://kit.fontawesome.com/b466b07c0a.js" crossorigin="anonymous"></script>

	<script src="js/script.js"></script>
	<link rel="stylesheet" href="css/style.css">
</head>

<body>
	<nav class="navbar is-transparent">
		<div class="navbar-brand">
			<a class="navbar-item" href="">
				<span class="icon">
					<i class="fa-solid fa-calculator"></i>
				</span>
				<span>NEWSTATE感度変換機</span>
			</a>
		</div>
		<div class="navbar-end">
			<div class="navbar-item">
				<div class="field is-grouped">
					<p class="control">
						<a class="bd-tw-button button" data-social-network="Twitter" data-social-action="tweet"
							data-social-target="https://twitter.com/simenatsu" target="_blank"
							href="https://twitter.com/intent/tweet?text=NEWSTATE%E2%9E%A8PUBGMOBILE%E6%84%9F%E5%BA%A6%E5%A4%89%E6%8F%9B%E6%A9%9F%20https%3A%2F%2Fsimenatsu.github.io%2Fnewstate-to-pubgm%20%40simenatsu%E3%82%88%E3%82%8A%20">
							<span class="icon">
								<i class="fab fa-twitter"></i>
							</span>
							<span>Tweet</span>
						</a>
					</p>
					<p class="control">
						<a class="button is-info" href="https://twitter.com/simenatsu" target="_blank">
							<span class="icon">
								<i class="fab fa-twitter"></i>
							</span>
							<span>@simenatsu</span>
						</a>
					</p>
				</div>
			</div>
		</div>
		</div>
	</nav>
	<section class="hero is-info">
		<div class="hero-body">
			<p class="title">
				NEW STATEの感度をPUBG Mobileの感度に
			</p>
			<p class="subtitle">
				NEW STATE➔PUBG Mobile
			</p>
			<!--<button class="button has-text-centered is-danger js-modal-trigger" data-target="modal-infomation">
				使い方
			</button>-->
			<p class="control">
				<a class="button has-text-centered is-danger js-modal-trigger" href="https://simenatsu.github.io/pubgm-to-newstate" target="_blank">
					PUBGM ➨ NEWSTATE
				</a>
			</p>
		</div>
	</section>
	<section class="section">
		<h1 class="title">NEW STATE感度</h1>
	</section>
	<div class="container">
		<div class="tabs is-medium is-centered">
			<ul>
				<li class="tab is-active" onclick="openInputTab(event,'normal')"><a>通常感度</a></li>
				<li class="tab" onclick="openInputTab(event,'gyro')"><a>ジャイロ感度</a></li>
			</ul>
		</div>
	</div>

	<div class="container section">


		<?php
			$scope_type = ["normal","gyro"];
			$column1 = ["TPP","1x","3x","6x"];
			$column2 = ["FPP","2x","4x","8x"];
			foreach($scope_type as $type){
				$style = ($type=="normal") ? "":  "style='display:none'"; 
				echo "
				<div id='{$type}' class='input-tab' {$style}>
					<div class='columns is-mobile'>
						<div class='column is-half'>
				";
				for($i=0;$i<=3;$i++){
					if($type=="gyro"){
						$calc_type = "gyro";
					}elseif(($type=="normal" && $column1[$i]=="TPP") || ($type=="normal" && $column1[$i]=="FPP")){
						$calc_type = "hip";
					}else{
						$calc_type = "normal";
					}
					$id = $type=="normal" ? "{$column1[$i]}" : "{$column1[$i]}_{$type}";
					echo "
						<div class='field'>
						<label class='label'>{$column1[$i]}</label>
							<div class='control'>
								<input id='{$id}_camera' class='input is-info' type='tel' placeholder='100'
								onkeyup=\"calculate('{$id}_camera','{$calc_type}')\">
							</div>
						</div>
						<div class='field'>
							<div class='control'>
								<input id='{$id}_scope' class='input is-info' type='tel' placeholder='100'
								onkeyup=\"calculate('{$id}_scope','{$calc_type}')\">
							</div>
						</div>
					";
				}
				echo "
					</div>
					<div class='column is-half'>
					";
				for($i=0;$i<=3;$i++){
					if($type=="gyro"){
						$calc_type = "gyro";
					}elseif(($type=="normal" && $column1[$i]=="TPP") || ($type=="normal" && $column1[$i]=="FPP")){
						$calc_type = "hip";
					}else{
						$calc_type = "normal";
					}
					$id = $type=="normal" ? "{$column2[$i]}" : "{$column2[$i]}_{$type}";
					echo "
						<div class='field'>
						<label class='label'>{$column2[$i]}</label>
							<div class='control'>
								<input id='{$id}_camera' class='input is-info' type='tel' placeholder='100'
								onkeyup=\"calculate('{$id}_camera','{$calc_type}')\">
							</div>
						</div>
						<div class='field'>
							<div class='control'>
								<input id='{$id}_scope' class='input is-info' type='tel' placeholder='100'
								onkeyup=\"calculate('{$id}_scope','{$calc_type}')\">
							</div>
						</div>
					";
				}
				echo "
						</div>
					</div>
				</div>
				";
			}
		?>

	</div>

	<section class="section">
		<h1 class="title">PUBG Mobile感度</h1>
	</section>

	<div class="container">
		<div class="tabs is-medium is-centered">
			<ul>
				<li class="outputTab is-active" onclick="openOutputTab(event,'camera')"><a>カメラ感度</a></li>
				<li class="outputTab" onclick="openOutputTab(event,'scope')"><a>スコープ感度</a></li>
				<li class="outputTab" onclick="openOutputTab(event,'gyro_camera')"><a>カメラ感度(ジャイロ)</a></li>
				<li class="outputTab" onclick="openOutputTab(event,'gyro_scope')"><a>スコープ感度(ジャイロ)</a></li>
			</ul>
		</div>
	</div>

	<?php
		$scope_type = ["camera","scope","gyro_camera","gyro_scope"];
		$column1 = ["TPP","1x","3x","6x"];
		$column2 = ["FPP","2x","4x","8x"];
		foreach($scope_type as $type){
			$style = ($type=="camera") ? "":  "style='display:none'"; 
			echo "
				<div id='{$type}' class='section container output-tab' {$style}>
					<div class='columns is-mobile'>
						<div class='column is-half'>
			";
			for($i=0;$i<=3;$i++){
				echo "
					<div class='field'>
					<label class='label'>{$column1[$i]}</label>
						<div class='control'>
							<input id='{$column1[$i]}_{$type}_out' class='input is-info' type='tel' placeholder='0'
							 readonly>
						</div>
					</div>
					";
			}
			echo "
			</div>
			<div class='column is-half'>
			";
			for($i=0;$i<=3;$i++){
				echo "
					<div class='field'>
					<label class='label'>{$column2[$i]}</label>
						<div class='control'>
							<input id='{$column2[$i]}_{$type}_out' class='input is-info' type='tel' placeholder='0'
							 readonly>
						</div>
					</div>
					";
			}
			echo "
						</div>
					</div>
				</div>
				";
		}
			
	?>

	<footer class="footer">
		<div class="content has-text-centered">
			<p>
				<div class="container">© 2021 natsu -
					<a href="https://twitter.com/simenatsu" target="_blank">natsu</a>
				</div>
			</p>
		</div>
	</footer>
</body>

</html>