const mongoose = require('mongoose');

const matchSchema = mongoose.Schema(
  {
    externalId: {
      type: String,
      required: true,
      unique: true
    },
    sport: {
      type: String,
      required: true,
      enum: ['football', 'basketball', 'tennis']
    },
    homeTeam: {
      id: String,
      name: String,
      logo: String
    },
    awayTeam: {
      id: String,
      name: String, 
      logo: String
    },
    // Pour le tennis, nous utiliserions homeTeam et awayTeam pour représenter les joueurs
    date: {
      type: Date,
      required: true
    },
    score: {
      home: Number,
      away: Number
    },
    venue: {
      name: String,
      city: String,
      country: String
    },
    league: {
      id: String,
      name: String,
      logo: String,
      country: String
    },
    status: {
      type: String,
      enum: ['scheduled', 'live', 'finished', 'postponed', 'canceled'],
      default: 'scheduled'
    },
    // Données spécifiques par sport - stockées en JSON
    details: {
      type: mongoose.Schema.Types.Mixed
    },
    // Statistiques agrégées
    stats: {
      averageRating: {
        type: Number,
        default: 0
      },
      totalRatings: {
        type: Number,
        default: 0
      },
      reviewCount: {
        type: Number,
        default: 0
      }
    }
  },
  {
    timestamps: true
  }
);

// Index pour améliorer les performances des recherches
matchSchema.index({ sport: 1, date: -1 });
matchSchema.index({ 'stats.averageRating': -1 });

const Match = mongoose.model('Match', matchSchema);

module.exports = Match;