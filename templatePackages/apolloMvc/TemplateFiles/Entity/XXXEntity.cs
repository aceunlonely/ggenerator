using System;
using System.Collections.Generic;
using Dcjet.Framework.Entity;
using System.Data;
namespace ${ddata.solution.NameSpace}.Entity
{
    /// <summary>
    /// ${data.Data.TableDesc}
    /// </summary>
    [EntityTable("${data.Data.TableName}", "${data.Data.TableDesc}")]
    [Serializable]
    public class ${data.Name}Entity : BaseEntity<${data.Name}Entity>
    {
       {@each data.DataInfos as di, index}
        /// <summary>
		/// ${di.Description}
		/// </summary>
        {@if di.IsAllowEmpty}
        [Required]
        {@/if}
        [EntityColumn(ColumnName="${di.Name}",ColumnDescName="${di.Description}",AllowNull= {@if di.IsAllowEmpty}true{@else}false{@/if} ,ColumnType=DbType.${di.RealDBDataType},MaxLength=${di.MaxLength},PointLength=${di.DecimalDigit},IsPriKey ={@if data.PrimaryColumn==di.Name}true{@else}false{@/if},IsIdentity =false, SortIndex ="-1")]
        public ${di.RealDataType} ${di.RealName}
        {
            get;
            set;
        }
        {@/each}
    }
}
