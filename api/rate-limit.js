const attempts = new Map();

module.exports = function rateLimit(ip, maxAttempts = 5, windowMs = 15 * 60 * 1000) {
  const now = Date.now();
  const key = ip;
  
  if (!attempts.has(key)) {
    attempts.set(key, { count: 1, firstAttempt: now });
    return { allowed: true };
  }

  const data = attempts.get(key);
  
  // Reset window if expired
  if (now - data.firstAttempt > windowMs) {
    attempts.set(key, { count: 1, firstAttempt: now });
    return { allowed: true };
  }

  // Increment count
  data.count++;
  attempts.set(key, data);

  if (data.count > maxAttempts) {
    const retryAfter = Math.ceil((data.firstAttempt + windowMs - now) / 1000);
    return { 
      allowed: false, 
      retryAfter,
      message: `Trop de tentatives. Réessayez dans ${Math.ceil(retryAfter/60)} minutes.`
    };
  }

  return { allowed: true };
};