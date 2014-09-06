<?php

function data_bahasa(){
	$my_file = 'Data Peta Bahasa.csv';
	$handle = fopen($my_file, 'r');
	$data = fread($handle,filesize($my_file));

	$values = explode(",", $data);
	$counter = 0;
	$lines = array();
	$row = array();
	// print_r($data);
	$ignore = false;
	$columns = array();
	foreach($values as $v){
	
		if(strpos($v, "\n")){
			$row[] = substr($v, 0, strlen($v)-2);
			if(!$ignore){
				$ignore = true;
				$row = array();
				$row[] = substr($v, strlen($v)-1, strlen($v));
				
			}else{
				$lines[] = $row;
				$row = array();
				$row[] = substr($v, strlen($v)-1, strlen($v));
			}
			// echo '<hr>';
		}else{
			$row[] = $v;
		}
		if($counter>=7){
			$counter = 0;
		}
		else
			$counter++;
	}
	// print_r($lines);
	echo json_encode($lines);
}
function data_area(){
	$my_file = 'Data Area.csv';
	$handle = fopen($my_file, 'r');
	$data = fread($handle,filesize($my_file));

	$values = explode(",", $data);
	$counter = 0;
	$lines = array();
	$row = array();
	// print_r($data);
	$ignore = false;
	$columns = array();
	foreach($values as $v){
		if(strpos($v, "\n")){
			$row[] = substr($v, 0, strlen($v)-2);
			if(!$ignore){
				$ignore = true;
				$row = array();
				$row[] = substr($v, strlen($v)-1, strlen($v));
				
			}else{
				$lines[] = $row;
				$row = array();
				$row[] = substr($v, strlen($v)-1, strlen($v));
			}
			// echo '<hr>';
		}else{
			$row[] = $v;
		}
		if($counter>=7){
			$counter = 0;
		}
		else
			$counter++;
	}
	// print_r($lines);
	echo json_encode($lines);
}
function data_area_mapping(){
	$my_file = 'Data Bahasa Area.csv';
	$handle = fopen($my_file, 'r');
	$data = fread($handle,filesize($my_file));

	$values = explode(",", $data);
	$counter = 0;
	$lines = array();
	$row = array();
	// print_r($data);
	$ignore = false;
	$columns = array();
	foreach($values as $v){
		if(strpos($v, "\n")){
			$row[] = substr($v, 0, strlen($v)-2);
			if(!$ignore){
				$ignore = true;
				$row = array();
				$row[] = substr($v, strlen($v)-1, strlen($v));
				
			}else{
				$lines[] = $row;
				$row = array();
				$row[] = substr($v, strlen($v)-1, strlen($v));
			}
			// echo '<hr>';
		}else{
			$row[] = $v;
		}
		if($counter>=7){
			$counter = 0;
		}
		else
			$counter++;
	}
	// print_r($lines);
	echo json_encode($lines);
}
function data_acara(){
	$my_file = 'Data Acara.csv';
	$handle = fopen($my_file, 'r');
	$data = fread($handle,filesize($my_file));

	$values = explode(",", $data);
	$counter = 0;
	$lines = array();
	$row = array();
	// print_r($data);
	$ignore = false;
	$columns = array();
	foreach($values as $v){
		if(strpos($v, "\n")){
			$row[] = substr($v, 0, strlen($v)-2);
			if(!$ignore){
				$ignore = true;
				$row = array();
				$row[] = substr($v, strlen($v)-1, strlen($v));
				
			}else{
				$lines[] = $row;
				$row = array();
				$row[] = substr($v, strlen($v)-1, strlen($v));
			}
			// echo '<hr>';
		}else{
			$row[] = $v;
		}
		if($counter>=6){
			$counter = 0;
		}
		else
			$counter++;
	}
	// print_r($lines);
	echo json_encode($lines);
}
function parse_data($filename, $columns_length){
	$my_file = $filename;
	$handle = fopen($my_file, 'r');
	$data = fread($handle,filesize($my_file));

	$values = explode(",", $data);
	$counter = 0;
	$lines = array();
	$row = array();
	// print_r($data);
	$ignore = false;
	$columns = array();
	foreach($values as $v){
		if(strpos($v, "\n")){
			$row[] = substr($v, 0, strlen($v)-2);
			if(!$ignore){ // skip baris pertama sebagai header
				$ignore = true;
				$row = array();
				$row[] = substr($v, strlen($v)-1, strlen($v));
				
			}else{
				$lines[] = $row;
				$row = array();
				$row[] = substr($v, strlen($v)-1, strlen($v));
			}
			// echo '<hr>';
		}else{
			$row[] = $v;
		}
		if($counter>=($columns_length-1)){
			$counter = 0;
		}
		else
			$counter++;
	}
	// print_r($lines);
	echo json_encode($lines);
}
parse_data("data area indonesia.csv", 3);
?>