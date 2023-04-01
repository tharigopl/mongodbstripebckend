const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;



const stripeuserSchema = new Schema({
    "id": {
      "type": "String"
    },
    "object": {
      "type": "String"
    },
    "business_profile": {
      "mcc": {
        "type": "Mixed"
      },
      "name": {
        "type": "Mixed"
      },
      "product_description": {
        "type": "Mixed"
      },
      "support_address": {
        "type": "Mixed"
      },
      "support_email": {
        "type": "Mixed"
      },
      "support_phone": {
        "type": "Mixed"
      },
      "support_url": {
        "type": "Mixed"
      },
      "url": {
        "type": "Mixed"
      }
    },
    "business_type": {
      "type": "String"
    },
    "capabilities": {},
    "charges_enabled": {
      "type": "Boolean"
    },
    "company": {
      "address": {
        "city": {
          "type": "Mixed"
        },
        "country": {
          "type": "String"
        },
        "line1": {
          "type": "Mixed"
        },
        "line2": {
          "type": "Mixed"
        },
        "postal_code": {
          "type": "Mixed"
        },
        "state": {
          "type": "Mixed"
        }
      },
      "directors_provided": {
        "type": "Boolean"
      },
      "executives_provided": {
        "type": "Boolean"
      },
      "name": {
        "type": "Mixed"
      },
      "owners_provided": {
        "type": "Boolean"
      },
      "tax_id_provided": {
        "type": "Boolean"
      },
      "verification": {
        "document": {
          "back": {
            "type": "Mixed"
          },
          "details": {
            "type": "Mixed"
          },
          "details_code": {
            "type": "Mixed"
          },
          "front": {
            "type": "Mixed"
          }
        }
      }
    },
    "country": {
      "type": "String"
    },
    "created": {
      "type": "Number"
    },
    "default_currency": {
      "type": "String"
    },
    "details_submitted": {
      "type": "Boolean"
    },
    "email": {
      "type": "String"
    },
    "external_accounts": {
      "object": {
        "type": "String"
      },
      "data": {
        "type": "Array"
      },
      "has_more": {
        "type": "Boolean"
      },
      "total_count": {
        "type": "Number"
      },
      "url": {
        "type": "String"
      }
    },
    "future_requirements": {
      "alternatives": {
        "type": "Array"
      },
      "current_deadline": {
        "type": "Mixed"
      },
      "currently_due": {
        "type": "Array"
      },
      "disabled_reason": {
        "type": "Mixed"
      },
      "errors": {
        "type": "Array"
      },
      "eventually_due": {
        "type": "Array"
      },
      "past_due": {
        "type": "Array"
      },
      "pending_verification": {
        "type": "Array"
      }
    },
    "individual": {
      "id": {
        "type": "String"
      },
      "object": {
        "type": "String"
      },
      "account": {
        "type": "String"
      },
      "address": {
        "city": {
          "type": "Mixed"
        },
        "country": {
          "type": "String"
        },
        "line1": {
          "type": "Mixed"
        },
        "line2": {
          "type": "Mixed"
        },
        "postal_code": {
          "type": "Mixed"
        },
        "state": {
          "type": "Mixed"
        }
      },
      "created": {
        "type": "Number"
      },
      "dob": {
        "day": {
          "type": "Mixed"
        },
        "month": {
          "type": "Mixed"
        },
        "year": {
          "type": "Mixed"
        }
      },
      "email": {
        "type": "String"
      },
      "first_name": {
        "type": "String"
      },
      "password": {
        "type": "String"
      },
      "name": {
        "type": "String"
      },
      "future_requirements": {
        "alternatives": {
          "type": "Array"
        },
        "currently_due": {
          "type": "Array"
        },
        "errors": {
          "type": "Array"
        },
        "eventually_due": {
          "type": "Array"
        },
        "past_due": {
          "type": "Array"
        },
        "pending_verification": {
          "type": "Array"
        }
      },
      "id_number_provided": {
        "type": "Boolean"
      },
      "last_name": {
        "type": "Mixed"
      },
      "metadata": {},
      "relationship": {
        "director": {
          "type": "Boolean"
        },
        "executive": {
          "type": "Boolean"
        },
        "owner": {
          "type": "Boolean"
        },
        "percent_ownership": {
          "type": "Mixed"
        },
        "representative": {
          "type": "Boolean"
        },
        "title": {
          "type": "Mixed"
        }
      },
      "requirements": {
        "alternatives": {
          "type": "Array"
        },
        "currently_due": {
          "type": "Array"
        },
        "errors": {
          "type": "Array"
        },
        "eventually_due": {
          "type": "Array"
        },
        "past_due": {
          "type": "Array"
        },
        "pending_verification": {
          "type": "Array"
        }
      },
      "ssn_last_4_provided": {
        "type": "Boolean"
      },
      "verification": {
        "additional_document": {
          "back": {
            "type": "Mixed"
          },
          "details": {
            "type": "Mixed"
          },
          "details_code": {
            "type": "Mixed"
          },
          "front": {
            "type": "Mixed"
          }
        },
        "details": {
          "type": "Mixed"
        },
        "details_code": {
          "type": "Mixed"
        },
        "document": {
          "back": {
            "type": "Mixed"
          },
          "details": {
            "type": "Mixed"
          },
          "details_code": {
            "type": "Mixed"
          },
          "front": {
            "type": "Mixed"
          }
        },
        "status": {
          "type": "String"
        }
      }
    },
    "login_links": {
      "object": {
        "type": "String"
      },
      "data": {
        "type": "Array"
      },
      "has_more": {
        "type": "Boolean"
      },
      "total_count": {
        "type": "Number"
      },
      "url": {
        "type": "String"
      }
    },
    "metadata": {},
    "payouts_enabled": {
      "type": "Boolean"
    },
    "requirements": {
      "alternatives": {
        "type": "Array"
      },
      "current_deadline": {
        "type": "Mixed"
      },
      "currently_due": {
        "type": [
          "String"
        ]
      },
      "disabled_reason": {
        "type": "String"
      },
      "errors": {
        "type": "Array"
      },
      "eventually_due": {
        "type": [
          "String"
        ]
      },
      "past_due": {
        "type": [
          "String"
        ]
      },
      "pending_verification": {
        "type": "Array"
      }
    },
    "settings": {
      "bacs_debit_payments": {},
      "branding": {
        "icon": {
          "type": "Mixed"
        },
        "logo": {
          "type": "Mixed"
        },
        "primary_color": {
          "type": "Mixed"
        },
        "secondary_color": {
          "type": "Mixed"
        }
      },
      "card_issuing": {
        "tos_acceptance": {
          "date": {
            "type": "Mixed"
          },
          "ip": {
            "type": "Mixed"
          }
        }
      },
      "card_payments": {
        "decline_on": {
          "avs_failure": {
            "type": "Boolean"
          },
          "cvc_failure": {
            "type": "Boolean"
          }
        },
        "statement_descriptor_prefix": {
          "type": "Mixed"
        },
        "statement_descriptor_prefix_kana": {
          "type": "Mixed"
        },
        "statement_descriptor_prefix_kanji": {
          "type": "Mixed"
        }
      },
      "dashboard": {
        "display_name": {
          "type": "Mixed"
        },
        "timezone": {
          "type": "String"
        }
      },
      "payments": {
        "statement_descriptor": {
          "type": "Mixed"
        },
        "statement_descriptor_kana": {
          "type": "Mixed"
        },
        "statement_descriptor_kanji": {
          "type": "Mixed"
        }
      },
      "payouts": {
        "debit_negative_balances": {
          "type": "Boolean"
        },
        "schedule": {
          "delay_days": {
            "type": "Number"
          },
          "interval": {
            "type": "String"
          }
        },
        "statement_descriptor": {
          "type": "Mixed"
        }
      },
      "sepa_debit_payments": {}
    },
    "tos_acceptance": {
      "date": {
        "type": "Mixed"
      },
      "ip": {
        "type": "Mixed"
      },
      "user_agent": {
        "type": "Mixed"
      }
    },
    "type": {
      "type": "String"
    },
    "accountLink": {
        "object": {
          "type": "String"
        },
        "created": {
          "type": "String"
        },
        "expires_at": {
          "type": "String"
        },
        "url": {
          "type": "String"
        }
      }
  });

stripeuserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('StripeUser', stripeuserSchema);


