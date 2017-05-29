using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using NS.lxy.Web.Areas.M.Search;
using NS.lxy.Web.Common;
using NS.lxy.Entity;

namespace NS.lxy.Web.Areas.M.Models
{
    public class ZjglCertListImgEditModel : NS.lxyBaseModel
    {
        private ZjglCertListImgSearch _searchEntity = null;
        public ZjglCertListImgSearch SearchEntity
        {
            get
            {
                if (_searchEntity == null)
                {
                    _searchEntity = new ZjglCertListImgSearch();
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

        public ZjglCertListImgEntity zjglCertListImg { get; set; }
		
		//数据绑定数据源
		
    }
}