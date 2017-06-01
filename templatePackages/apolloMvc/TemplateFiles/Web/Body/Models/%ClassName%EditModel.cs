using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using %NameSpace%Web.Areas.%MVC-MODULE%.Search;
using %NameSpace%Web.Common;
using %NameSpace%Entity;

namespace %NameSpace%Web.Areas.%MVC-MODULE%.Models
{
    public class %ClassName%EditModel : %NameSpaceOnly%BaseModel
    {
        private %ClassName%Search _searchEntity = null;
        public %ClassName%Search SearchEntity
        {
            get
            {
                if (_searchEntity == null)
                {
                    _searchEntity = new %ClassName%Search();
                }
                return _searchEntity;

            }
            set
            {
                _searchEntity = value;
            }
        }
        public string HeadOid { get; set; }

        public string ID { get; set; }

        public %ClassName%Entity %ClassNameObj% { get; set; }
		
		//数据绑定数据源
		%MVC_MODELCTRLLISTEDIT%
    }
}