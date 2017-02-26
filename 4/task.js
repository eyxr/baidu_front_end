var webPage = require('webpage'),
    system = require('system');

var page = webPage.create();



var url = "https://www.baidu.com/baidu?wd=",
    key_word;
    

if (system.args.length === 1) {       
    key_word = 'test';
} else {
    key_word = system.args[1];
}

url = url + key_word;
console.log("use URL  ==>  " + url);

page.open(url,function (status) {
    var t = Date.now();
    console.log('open URL ....');
    if(status === 'fail') {
        console.log('Can not open the URL');
        phantom.exit();
    }

    console.log('open successful');
    var jstr = page.evaluate(function() {
        
        var ret = {};
        ret.code        =   1;
        ret.msg         =   '抓取成功';
        ret.dataList    =   [];
        var all_data = document.getElementsByClassName('c-container');
        for (var i = 0; i< all_data.length;++i){
            var temp_data_obj = {};
            temp_data_obj.title =   all_data[i].getElementsByTagName('h3')[0].getElementsByTagName('a')[0].innerHTML;
            if(all_data[i].getElementsByClassName('c-abstract')[0]) {
                temp_data_obj.info  =   all_data[i].getElementsByClassName('c-abstract')[0].innerHTML;
            }
            temp_data_obj.link  =   all_data[i].getElementsByTagName('h3')[0].getElementsByTagName('a')[0].getAttribute('href');
            if(all_data[i].getElementsByClassName('c-row')[0]) {
                temp_data_obj.pic   =   all_data[i].getElementsByClassName('c-row')[0].getElementsByTagName('img')[0].getAttribute('src');
            }        
            ret.dataList.push(temp_data_obj);  
            
        }
        
        
        
        return JSON.stringify(ret);
    }); 
    
    
    var temp_json =  JSON.parse(jstr);
    
    
    temp_json.time = Date.now() - t;
    
    temp_json.word = key_word;
    
    jstr = JSON.stringify(temp_json);
    
    //最后的JSON格式结果
    console.log( 'the jstr is          ' +   jstr + '             ' + typeof(jstr));
      
    phantom.exit();
    return jstr;
});




















        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        

        
        
        



















