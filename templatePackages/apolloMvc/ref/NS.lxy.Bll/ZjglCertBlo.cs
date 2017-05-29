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
    /// 证件表逻辑层类
    /// </summary>
    public class ZjglCertBlo: DataBaseBlo<ZjglCertEntity>
    {
        private readonly ZjglCertDao dao = null;
        public ZjglCertBlo()
            : base(new ZjglCertDao())
        {
            dao = (ZjglCertDao)base.AccessDao;
        }
    }
}
