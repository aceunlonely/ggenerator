using System;
using System.Collections;
using System.Data;
using Dcjet.Apollo.MvcCommon;
using Dcjet.Framework.Entity;
using NS.lxy.Entity;
using NS.lxy.Core.Dao;

namespace NS.lxy.Core.Bll
{
    /// <summary>
    /// 证书料号清单逻辑层类
    /// </summary>
    public class ZjglCertListImgBlo: DataBaseBlo<ZjglCertListImgEntity>
    {
        private readonly ZjglCertListImgDao dao = null;
        public ZjglCertListImgBlo()
            : base(new ZjglCertListImgDao())
        {
            dao = (ZjglCertListImgDao)base.AccessDao;
        }
    }
}
