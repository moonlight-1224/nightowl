<?php
 header("Content-Type: text/html; charset=utf-8");
//判断文件是否上传成功
function addLock($myStr){
    $keyArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
    'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
    'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '.', '_'
];
    $lockedStr="";
    for($i=0;$i<strlen($myStr);$i++){
        $lockedStr.= $keyArray[count($keyArray)-1-array_search($myStr[$i],$keyArray)];
    }
    return $lockedStr;
}
function image_upload(){
    echo "这是图片上传中介php页面"."<br/>";
    echo "<pre>"; 
    var_dump ($_FILES["image"]);
    $file=$_FILES['image'];
    
    if (is_uploaded_file($file['tmp_name'])) {
        $myfile = $file['tmp_name'];
        $image_name="";
        //开启对称加密传输
        $Array = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
        'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
        'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '.', '_'
        ];
        //获取真实数据
        for($i=0;$i<8;$i++){
            if($Array[rand(0,sizeof($Array)-1)]=='.')$i--;
            else $image_name.=$Array[rand(0,sizeof($Array)-1)];
        }
        $image_type=$file["type"];
        $image_type=substr($image_type,strrpos($image_type,'/')+1);
        $image_name.=".".$image_type;
       
        $remote_file='../uploaded_images/'.$image_name;
        if(move_uploaded_file($myfile,$remote_file)){
            //采用url的方式传值
             $url="../html/uploaded_success.html?".addLock("image_name")."=".addLock($image_name);
        } 
        else{
			$url="../html/uploaded_fail.html";
        }
        header("Location: {$url}");
    }
    else echo "你所上传的文件不是可上传文件！";
}
image_upload();
