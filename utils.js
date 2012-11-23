                             
function insertJS(url, callback){
    var script = document.createElement("SCRIPT"), done = false;
    script.type = "text/javascript";
    script.src = url;
    script.charset = "GB2312";
    script.onload = script.onreadystatechange = function(){
        if ( !done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete") ) {
            done = true;
            callback && callback();
        }
    };
    document.getElementsByTagName("HEAD")[0].appendChild(script);
}

function equal(objA, objB)
{
    if (typeof arguments[0] != typeof arguments[1])
        return false;

    //����
    if (arguments[0] instanceof Array)
    {
        if (arguments[0].length != arguments[1].length)
            return false;
        
        var allElementsEqual = true;
        for (var i = 0; i < arguments[0].length; ++i)
        {
            if (typeof arguments[0][i] != typeof arguments[1][i])
                return false;

            if (typeof arguments[0][i] == 'number' && typeof arguments[1][i] == 'number')
                allElementsEqual = (arguments[0][i] == arguments[1][i]);
            else
                allElementsEqual = arguments.callee(arguments[0][i], arguments[1][i]);            //�ݹ��ж϶����Ƿ����                
        }
        return allElementsEqual;
    }
    
    //����
    if (arguments[0] instanceof Object && arguments[1] instanceof Object)
    {
        var result = true;
        var attributeLengthA = 0, attributeLengthB = 0;
        for (var o in arguments[0])
        {
            //�ж����������ͬ�������Ƿ���ͬ�����ֻ��ַ�����
            if (typeof arguments[0][o] == 'number' || typeof arguments[0][o] == 'string')
                result = eval("arguments[0]['" + o + "'] == arguments[1]['" + o + "']");
            else {
                //������������Ҳ�Ƕ�����ݹ��ж����������ͬ������
                //if (!arguments.callee(arguments[0][o], arguments[1][o]))
                if (!arguments.callee(eval("arguments[0]['" + o + "']"), eval("arguments[1]['" + o + "']")))
                {
                    result = false;
                    return result;
                }
            }
            ++attributeLengthA;
        }
        
        for (var o in arguments[1]) {
            ++attributeLengthB;
        }
        
        //������������������Ŀ���ȣ�����������Ҳ����
        if (attributeLengthA != attributeLengthB)
            result = false;
        return result;
    }
    return arguments[0] == arguments[1];
}
