function onFormSubmit(e) {
  //==========================================================
  // 設定箇所
  //==========================================================
  var CALENDAR_ID = '{自分のメールアドレス}';
  var SHIFT1 = '日勤';
  var SHIFT2 = '夜勤';
  
  // 日勤の時間設定
  var SHIFT1_START_HOUR = 8;
  var SHIFT1_START_MINUTE = 0;
  var SHIFT1_END_HOUR = 20;
  var SHIFT1_END_MINUTE = 30;
  
  // 夜勤の時間設定
  var SHIFT2_START_HOUR = 20;
  var SHIFT2_START_MINUTE = 0;
  var SHIFT2_END_HOUR = 8;
  var SHIFT2_END_MINUTE = 30;
  //----------------------------------------------------------
  
  // フォームの回答を取得
  var formResponse = e.response;
  var itemResponses = formResponse.getItemResponses();
  
  // フォームの回答から各値を取得
  var year = Number(itemResponses[0].getResponse());    // 年
  var month = Number(itemResponses[1].getResponse());   // 月
  var shift1 = itemResponses[2].getResponse();         // 日勤の日付
  var shift2 = itemResponses[3].getResponse();         // 夜勤の日付
  
  var shift1List = shift1 ? shift1.split(',').map(s => s.trim()) : [];
  var shift2List = shift2 ? shift2.split(',').map(s => s.trim()) : [];
  
  // シフト1（日勤）を登録
  for (var i = 0; i < shift1List.length; i++) {
    var startDate = new Date(year, month - 1, shift1List[i], SHIFT1_START_HOUR, SHIFT1_START_MINUTE);
    var endDate = new Date(year, month - 1, shift1List[i], SHIFT1_END_HOUR, SHIFT1_END_MINUTE);
    createTimeEvent(CALENDAR_ID, SHIFT1, startDate, endDate);
    Logger.log('日勤イベントを作成しました: ' + startDate);
  }
  
  // シフト2（夜勤）を登録
  for (var i = 0; i < shift2List.length; i++) {
    var startDate = new Date(year, month - 1, shift2List[i], SHIFT2_START_HOUR, SHIFT2_START_MINUTE);
    // 終了時刻は翌日になるので、日付を1日進める
    var endDate = new Date(year, month - 1, Number(shift2List[i]) + 1, SHIFT2_END_HOUR, SHIFT2_END_MINUTE);
    createTimeEvent(CALENDAR_ID, SHIFT2, startDate, endDate);
    Logger.log('夜勤イベントを作成しました: ' + startDate);
  }
}

// カレンダーに時間指定のイベントを作成
function createTimeEvent(calendarId, title, startDate, endDate) {
  var calendar = CalendarApp.getCalendarById(calendarId);
  calendar.createEvent(title, startDate, endDate);
}