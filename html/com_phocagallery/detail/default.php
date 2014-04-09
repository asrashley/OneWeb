<?php defined('_JEXEC') or die('Restricted access');
echo '<div id="phocagallery" class="pg-detail-view'.$this->params->get( 'pageclass_sfx' ).'">';
if ($this->tmpl['backbutton'] != '') {
	echo $this->tmpl['backbutton'];
}

switch ($this->tmpl['detailwindow']) {
	case 4:
	case 7:
	case 9:
	case 10:
		$closeImage 	= $this->item->linkimage;
		$closeButton 	= '';
	break;
	default:
		$closeButton 	= '<td align="center">' . str_replace("%onclickclose%", $this->tmpl['detailwindowclose'], $this->item->closebutton). '</td>';
		$closeImage 	= '<a href="#" onclick="'.$this->tmpl['detailwindowclose'].'" style="margin:auto;padding:0">'.$this->item->linkimage.'</a>';
	break;

}

echo '<table class="center pg-detail-table" >'
	.'<tr>'
	.'<td colspan="6" class="pg-image-cell" >'
	.'<div id="phocaGalleryImageBox" ' ;
if($this->item->realimagewidth > $this->item->realimageheight) {
	echo ' class="pg-landscape" ';
} else {
	echo ' class="pg-portrait" ';
}
echo '>'
	.$closeImage;
			
$titleDesc = '';
if ($this->tmpl['display_title_description'] == 1) {
	$titleDesc .= $this->item->title;
	if ($this->item->description != '' && $titleDesc != '') {
		$titleDesc .= ' - ';
	}
}
			
// Lightbox Description
if ($this->tmpl['displaydescriptiondetail'] == 2 && (!empty($this->item->description) || !empty($titleDesc))){

	echo '<div id="description-msg"  class="pg-dv-desc-lightbox">'
    .'<div id="description-text"  class="pg-dv-desc-lightbox">'
	//. $titleDesc . $this->item->description.'</div></div>';
	.(JHtml::_('content.prepare', $titleDesc . $this->item->description, 'com_phocagallery.item')).'</div></div>';
}

echo '</div>'
	 .'</td>'
	 .'</tr>';
	
echo '<tr><td colspan="6"><div style="padding:0;margin:0;height:3px;font-size:0px;">&nbsp;</div></td></tr>';
// Standard Description
if ($this->tmpl['displaydescriptiondetail'] == 1) {
	echo '<tr>'
	.'<td colspan="6" align="left" valign="top" class="pg-dv-desc">'
	.'<div class="pg-dv-desc">'
	//. $titleDesc . $this->item->description . '</div>'
	.(JHtml::_('content.prepare', $titleDesc . $this->item->description, 'com_phocagallery.item')). '</div>'
	.'</td>'
	.'</tr>';
}

if ($this->tmpl['detailbuttons'] == 1){
	echo '<tr class="pg-detail-buttons">'
	.'<td >'.$this->item->prevbutton.'</td>'
	.'<td >'.$this->item->slideshowbutton.'</td>'
	.'<td >'.str_replace("%onclickreload%", $this->tmpl['detailwindowreload'], $this->item->reloadbutton).'</td>'
	. $closeButton
	.'<td >'.$this->item->nextbutton.'</td>'
	.'</tr>';
}

echo '</table>';
echo $this->loadTemplate('rating');
// Tags
if ($this->tmpl['displaying_tags_output'] != '') {
	echo '<div class="pg-detail-tags">'.$this->tmpl['displaying_tags_output'].'</div>';
}
if ($this->tmpl['detailwindow'] == 7) {
	
	
	
	if ($this->tmpl['externalcommentsystem'] == 1) {
		if (JComponentHelper::isEnabled('com_jcomments', true)) {
			include_once(JPATH_BASE.DS.'components'.DS.'com_jcomments'.DS.'jcomments.php');
			echo JComments::showComments($this->item->id, 'com_phocagallery_images', JText::_('COM_PHOCAGALLERY_IMAGE') .' '. $this->item->title);
		}
	}
	echo '<div class="pg-powered-by">' . PhocaGalleryRenderFront::renderInfo() . '</div>';
}
echo '</div>';
echo '<div id="phocaGallerySlideshowC" style="display:none"></div>';
?>
