﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TMS.Domain.Entites.Responses.Load
{
    internal class LoadResponse
    {
        public string Description { get; set; }
        public float Quantity { get; set; }
        public string Type { get; set; }
        public bool IsActive { get; set; }
        public Guid ClientGuid { get; set; }
    }
}
