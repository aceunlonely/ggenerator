using System;
using System.Collections;
using System.Data;
using Dcjet.Apollo.MvcCommon;
using Dcjet.Framework.Entity;
using ${ddata.solution.NameSpace}.Entity;
using ${ddata.solution.NameSpace}.Core.Dao;

namespace ${ddata.solution.NameSpace}.Core.Bll
{
    /// <summary>
    /// ${data.Data.TableDesc}逻辑层类
    /// </summary>
    public class ${data.Name}Blo: DataBaseBlo<${data.Name}Entity>
    {
        private readonly ${data.Name}Dao dao = null;
        public ${data.Name}Blo()
            : base(new ${data.Name}Dao())
        {
            dao = (${data.Name}Dao)base.AccessDao;
        }
    }
}