FROM python:3.12-slim
WORKDIR /app
COPY server.py /app/
COPY static /app/static
ENV LEARN_DATA=/data HOST=0.0.0.0 PORT=8080
RUN useradd --uid 10001 --create-home learner && mkdir /data && chown learner /data
USER learner
EXPOSE 8080
CMD ["python", "server.py"]

