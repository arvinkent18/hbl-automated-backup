<?php
ini_set('display_errors', 1); // set to 0 for production version
error_reporting(E_ALL);

class ContentSaver {
	private $path;
	private $file;
	private $data;
	private $fileName;
	
	/**
	 * Sets the path for the file. 
	 *
	 * @param string $path
	 * @access public 
	 */	
	public function setPath($path) {
		$this->path = $path;
	}
	/**
	 * Sets the filename for the file. 
	 *
	 * @param string $fileName
	 * @access public 
	 */	
	public function setFileName($fileName) {
		$this->fileName = $fileName;
	}
	
	/**
	 * Sets the content data. 
	 *
	 * @param string $data
	 * @access public 
	 */	
	public function setData($data) {
		$this->data = $data;
	}
	
	/**
	 * Checks if the file is writable then writes to the file.
   *
   * @return integer number
   * @access public
	 */
	public function writeToFile() {
		#if ($this->isFileWritable('test2.txt')) {
		  $file = fopen($this->getFileName(), 'w+') or die('Unable to open file!');
			fwrite($file, $this->getData()); 
			fclose($file);
		#}
	}
	
	/**
	 * Checks if file has been modified.
	 *
	 * @access public
	 * @return date
	 */
	public function isFileModified() {
		if (file_exists($this->getFileName())) {
			return date ('F d Y H:i:s.', filemtime($this->getFileName()));
		}
	}
	
	/**
	 * Checks if file is writable or not.
	 *
	 * @param string $fileName
	 * @return boolean 0 or 1
	 * @access public
	 */
	public function isFileWritable($fileName) {
		if (is_writable($fileName)) {
			return 0;
		}
		else {
			return 1;
		}
	}
	
	/**
	 * Gets Property File.
	 * 
	 * @return file
   * @acess public
	 */
	public function getFile() {
		return $this->file;
	}
	
	/**
	 * Get's File Name. 
	 * 
	 * @return filename
	 * @access public
	 */
	public function getFileName() {
		return $this->fileName;
	}
	
	/**
	 * Get's Data.
	 *
	 * @return data
	 * @access public
	 */
	public function getData() {
		return $this->data;
	}
	
	/**
	 * Get's Path.
	 *
	 * @return path
	 * @access public
	 */
	public function getPath() {
		return $this->path;
	}
}

$contentSaver = new ContentSaver();
$contentSaver->setFileName('../'.$_REQUEST['filename']);
$contentSaver->setData($_REQUEST['content']);
$contentSaver->writeToFile();

$file = fopen('../file-to-load.txt', 'w+') or die('Unable to open file!');
fwrite($file, $_REQUEST['filename']);
fclose($file);

echo file_get_contents('../'.$_REQUEST['filename']);

?>