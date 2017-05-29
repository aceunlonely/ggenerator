using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using NS.lxy.Web.Areas.M.Search;
using NS.lxy.Web.Common;
using System.Web.Mvc;


namespace NS.lxy.Web.Areas.M.Models
{
    public class ZjglCertIndexModel : NS.lxyBaseModel
    {
        private ZjglCertSearch searchEntity = null;
        public ZjglCertSearch SearchEntity
        {
            get
            {
                if (searchEntity == null)
                {
                    searchEntity = new ZjglCertSearch();
                }
                return searchEntity;

            }
            set
            {
                searchEntity = value;
            }
        }
		
		//数据绑定数据源
	    
    }
}