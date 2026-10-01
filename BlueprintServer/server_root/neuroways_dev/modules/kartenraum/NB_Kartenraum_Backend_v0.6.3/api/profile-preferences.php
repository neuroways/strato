<?php
declare(strict_types=1); require __DIR__.'/bootstrap.php';
try {
 $p=$auth->requireSession(bearer_token()); $id=(int)$p['profile_id'];
 if($_SERVER['REQUEST_METHOD']==='POST'){
  $d=request_json(); $c=strtoupper(trim((string)($d['card_audience_code']??'')));
  $l=strtoupper(trim((string)($d['ui_language_mode']??''))); $v=strtoupper(trim((string)($d['visual_mode']??'')));
  if(!in_array($c,['CHILD','ADULT'],true)) throw new RuntimeException('CARD_AUDIENCE_INVALID');
  if(!in_array($l,['CLEAR','DETAILED'],true)) throw new RuntimeException('UI_LANGUAGE_INVALID');
  if(!in_array($v,['WONDER','NIGHT'],true)) throw new RuntimeException('VISUAL_MODE_INVALID');
  $q=$pdo->prepare("UPDATE nb_user_profile SET card_audience_code=:c,ui_language_mode=:l,visual_mode=:v WHERE profile_id=:id");
  $q->execute(['c'=>$c,'l'=>$l,'v'=>$v,'id'=>$id]);
 }
 $q=$pdo->prepare("SELECT profile_id,audience_code,card_audience_code,ui_language_mode,visual_mode FROM nb_user_profile WHERE profile_id=:id");
 $q->execute(['id'=>$id]); json_response(['status'=>'ok','preferences'=>$q->fetch()]);
} catch(Throwable $e){json_response(['status'=>'error','error'=>$e->getMessage()],$e->getMessage()==='AUTH_REQUIRED'?401:400);}
