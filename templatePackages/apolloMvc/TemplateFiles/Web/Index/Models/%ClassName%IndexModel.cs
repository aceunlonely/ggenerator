using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using %NameSpace%Web.Areas.%MVC-MODULE%.Search;
using %NameSpace%Web.Common;
using System.Web.Mvc;


namespace %NameSpace%Web.Areas.%MVC-MODULE%.Models
{
    public class %ClassName%IndexModel : %NameSpaceOnly%BaseModel
    {
        private %ClassName%Search searchEntity = null;
        public %ClassName%Search SearchEntity
        {
            get
            {
                if (searchEntity == null)
                {
                    searchEntity = new %ClassName%Search();
                }
                return searchEntity;

            }
            set
            {
                searchEntity = value;
            }
        }
		
		//数据绑定数据源
	    %MVC_MODELCTRLLISTINDEX%
    }
}