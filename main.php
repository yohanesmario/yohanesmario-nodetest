<?php
    // PLEASE NOTE: This is made only to show that it is possible to use PHP
    //              as a message queue middleware. Only 2 peers so far have been
    //              tested.

	error_reporting(0);
	set_time_limit(0);

	if ($_SERVER['REQUEST_METHOD']=="GET") {
		if (isset($_GET['topic'])) {
            $topic = $_GET['topic'];
			$loop = true;
			$time = time();
			echo " ";
			while($loop){
				$newTime = time();
				if ($newTime>=$time+5) {
					$time = $newTime;
					echo " ";
				}
				try {
					$data = file_get_contents(md5($topic).".queue");
					if ($data!==false) {
						if (trim($data)!=="") {
							file_put_contents(md5($topic).".queue", "", LOCK_EX);
							echo json_encode(array("data"=>$data));
						}
					}
				} catch(Exception $e) {
					$e->getMessage();
				}
			}
		}
	} else if ($_SERVER['REQUEST_METHOD']=="POST") {
		if (isset($_GET['topic'])) {
            $topic = $_GET['topic'];
			$data = file_get_contents("php://input");
			file_put_contents(md5($topic).".queue", $data, LOCK_EX);
			echo json_encode(array("status"=>"OK"));
		}
	}