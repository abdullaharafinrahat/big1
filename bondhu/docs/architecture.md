# Bondhu Architecture

Bondhu has a static PWA frontend and an Express API. Requests and missing reports enter a moderation queue; approved blood requests flow to the matching engine, which filters compatible blood groups and ranks donors by distance and reliability. Redis/RabbitMQ integrations are represented by wrappers for production replacement.
